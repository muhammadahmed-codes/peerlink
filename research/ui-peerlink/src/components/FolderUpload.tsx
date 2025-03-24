import type React from "react";
import { useState, useRef, useCallback } from "react";
import { FolderUp, File, X, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/Progress";
import { Card, CardContent } from "@/components/ui/card";
import { ToastContainer, toast } from "react-toastify";

interface FileWithPath extends File {
  webkitRelativePath: string;
}

interface UploadedFile {
  file: File; // Store the actual file
  name: string;
  path: string;
  size: number;
  status: "pending" | "uploading" | "success" | "error";
  progress: number;
}


export function FolderUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [overallProgress, setOverallProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    const newFiles: UploadedFile[] = [];

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i] as FileWithPath;
      newFiles.push({
        file, // Store the actual file
        name: file.name,
        path: file.webkitRelativePath,
        size: file.size,
        status: "pending",
        progress: 0,
      });
    }

    setFiles(newFiles);
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    toast.info("Please use the 'Choose Folder' button");
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const uploadFiles = async () => {
    if (files.length === 0 || isUploading) return;

    setIsUploading(true);
    const formData = new FormData();

    for (let fileObj of files) {
      formData.append("files", fileObj.file, fileObj.path); // Use `fileObj.file`
    }

    try {
      console.log("📤 Sending files to server...");
      const response = await fetch("http://127.0.0.1:5001/upload-folder", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Upload failed");
      }
      toast.success(data.message || "Files uploaded successfully!");
    } catch (error: any) {
      console.error("❌ Upload Error:", error);
      toast.error("Failed to upload files.");
    } finally {
      setIsUploading(false);
    }
  };


  const clearFiles = () => {
    setFiles([]);
    setOverallProgress(0);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-6">
          <div
            className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => inputRef.current?.click()}
          >
            <FolderUp className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">Choose a folder to upload</h3>
            <p className="text-sm text-muted-foreground mb-4">Click to browse or drag and drop your folder here</p>
            <Button variant="outline" className="mx-auto">Choose Folder</Button>
            <input
              ref={inputRef}
              type="file"
              className="hidden"
              {...({ webkitdirectory: "", directory: "" } as any)}
              multiple
              onChange={handleFileChange}
            />
          </div>
        </CardContent>
      </Card>

      {files.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Files to upload</h3>
              <p className="text-sm text-muted-foreground">
                {files.length} files selected ({formatFileSize(files.reduce((sum, file) => sum + file.size, 0))})
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={clearFiles} disabled={isUploading}>
                <X className="h-4 w-4 mr-2" />
                Clear
              </Button>
              <Button size="sm" onClick={uploadFiles} disabled={isUploading || files.length === 0}>
                {isUploading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <FolderUp className="h-4 w-4 mr-2" />
                    Upload
                  </>
                )}
              </Button>
            </div>
          </div>
          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall progress</span>
                <span>{Math.round(overallProgress)}%</span>
              </div>
              <Progress value={overallProgress} className="h-2" />
            </div>
          )}
          <div className="border rounded-lg divide-y max-h-[400px] overflow-y-auto">
            {files.map((file, index) => (
              <div key={index} className="p-3 flex items-center text-sm">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center">
                    <File className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="font-medium truncate">{file.name}</span>
                  </div>
                  <div className="text-xs text-muted-foreground truncate mt-1">{file.path}</div>
                </div>
                <div className="ml-4 flex-shrink-0 text-xs text-muted-foreground">{formatFileSize(file.size)}</div>
                <div className="ml-4 w-24 flex-shrink-0">
                  {file.status === "pending" && <span className="text-xs">Pending</span>}
                  {file.status === "uploading" && <Progress value={file.progress} className="h-1.5" />}
                  {file.status === "success" && (
                    <div className="flex items-center text-green-500">
                      <Check className="h-4 w-4 mr-1" />
                      <span className="text-xs">Complete</span>
                    </div>
                  )}
                  {file.status === "error" && (
                    <div className="flex items-center text-red-500">
                      <X className="h-4 w-4 mr-1" />
                      <span className="text-xs">Failed</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}