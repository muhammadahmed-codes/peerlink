using Microsoft.AspNetCore.Mvc;
using System;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.NetworkInformation;
using System.Runtime.InteropServices;
using System.Text.Json;

[Route("api/system")]
[ApiController]
public class SystemInfoController : ControllerBase
{
    [HttpGet("info")]
    public IActionResult GetSystemInfo()
    {
        try
        {
            var systemInfo = new
            {
                LocalIPAddress = GetLocalIPAddress(),
                PublicIPAddress = GetPublicIPAddress(),
                OS = RuntimeInformation.OSDescription,
                CPU = GetProcessorName(),
                RAM = GetTotalRAM()
            };

            return Ok(systemInfo);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }

    private string GetLocalIPAddress()
    {
        foreach (NetworkInterface netInterface in NetworkInterface.GetAllNetworkInterfaces())
        {
            foreach (UnicastIPAddressInformation ip in netInterface.GetIPProperties().UnicastAddresses)
            {
                if (ip.Address.AddressFamily == System.Net.Sockets.AddressFamily.InterNetwork)
                {
                    return ip.Address.ToString();
                }
            }
        }
        return "Not found";
    }

    private string GetPublicIPAddress()
    {
        try
        {
            using (var client = new WebClient())
            {
                return client.DownloadString("https://api64.ipify.org").Trim();
            }
        }
        catch
        {
            return "Unable to retrieve public IP";
        }
    }

    private string GetProcessorName()
    {
        if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
        {
            try
            {
                using (var searcher = new System.Management.ManagementObjectSearcher("SELECT * FROM Win32_Processor"))
                {
                    foreach (var obj in searcher.Get())
                    {
                        return obj["Name"]?.ToString() ?? "Unknown CPU";
                    }
                }
            }
            catch { return "Unknown CPU"; }
        }
        else if (RuntimeInformation.IsOSPlatform(OSPlatform.OSX) || RuntimeInformation.IsOSPlatform(OSPlatform.Linux))
        {
            try
            {
                return RunBashCommand("sysctl -n machdep.cpu.brand_string");
            }
            catch { return "Unknown CPU"; }
        }
        return "Unknown CPU";
    }

    private string GetTotalRAM()
    {
        if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
        {
            try
            {
                using (var searcher = new System.Management.ManagementObjectSearcher("SELECT * FROM Win32_ComputerSystem"))
                {
                    foreach (var obj in searcher.Get())
                    {
                        double totalMemoryInGB = Convert.ToDouble(obj["TotalPhysicalMemory"]) / (1024 * 1024 * 1024);
                        return $"{Math.Round(totalMemoryInGB)} GB"; // Rounded to nearest GB
                    }
                }
            }
            catch { return "Unknown RAM"; }
        }
        else if (RuntimeInformation.IsOSPlatform(OSPlatform.OSX) || RuntimeInformation.IsOSPlatform(OSPlatform.Linux))
        {
            try
            {
                string memBytes = RunBashCommand("sysctl -n hw.memsize");
                double totalMemoryInGB = Convert.ToDouble(memBytes) / (1024 * 1024 * 1024);
                return $"{Math.Round(totalMemoryInGB)} GB"; // Rounded to nearest GB
            }
            catch { return "Unknown RAM"; }
        }
        return "Unknown RAM";
    }


    private string RunBashCommand(string command)
    {
        var process = new Process
        {
            StartInfo = new ProcessStartInfo
            {
                FileName = "/bin/bash",
                Arguments = $"-c \"{command}\"",
                RedirectStandardOutput = true,
                UseShellExecute = false,
                CreateNoWindow = true
            }
        };
        process.Start();
        string result = process.StandardOutput.ReadToEnd().Trim();
        process.WaitForExit();
        return result;
    }
}
