import DashboardLayout from "./layout";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ToastContainer, toast } from 'react-toastify';
import { AlertCircle } from "lucide-react"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react";

interface PeerSpecs {
    publicIPAddress: string,
    cpu: string,
    ram: string
}

interface Projects {
    name: string,
    language: string, 
    filename: string
}

export default function Projects() {

    const [ram, setRam] = useState<string | null>(null);

    const peerSpecs: PeerSpecs =
    {
        publicIPAddress: "110.38.229.3",
        cpu: "Apple M3",
        ram: "8 GB",
    }
    
    const executeProject = () => {
        toast.error("Code execution failed.");
    }

    const project = {
        name: "Number Addition",
        language: "C#",
        fileName: "sum_of_two_numbers.cs"
    }
    
    const getDeviceInfo = () => {
        const nav = navigator as Navigator & { deviceMemory? : Number }
        return {
            ram: nav.deviceMemory ? nav.deviceMemory + " GB" : "Unknown"
        };
    };

    useEffect(() => {
        const RAM = getDeviceInfo();
        setRam(RAM.ram);
        console.log(RAM);
    }, [])

    return (
        <>
            <DashboardLayout>
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Limitation ahead!</AlertTitle>
                    <AlertDescription>
                        PeerLink V0.1 allows execution on max 1 peer machine. 
                        Currently only 4 languages are supported on this platform.
                    </AlertDescription>
                </Alert>

                <h1 style={{ fontWeight: 'bold', fontSize: 30, marginTop: 20 }}>Projects</h1>

                <Card className="w-[350px] mt-5">
                    <CardHeader>
                        <CardTitle>{project.name}</CardTitle>
                        <CardTitle>{ram}</CardTitle>
                        {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name">File Name</Label>
                                    <Input id="name" placeholder={project.fileName} disabled />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name">Available Peers</Label>
                                    <Select>
                                        <SelectTrigger id="language">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent position="popper">
                                            <SelectItem value="cplusplus">Anas#4556 (125ms)</SelectItem>
                                            <SelectItem value="c">Shaheer#3323 (34ms)</SelectItem>
                                            <SelectItem value="python">Faraz#3313 (31ms)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="name">Peer Machine Specs</Label>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-[100px]">Public IP</TableHead>
                                                <TableHead>CPU</TableHead>
                                                <TableHead>RAM</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                        <TableRow>
                                                    <TableCell className="font-medium">{peerSpecs.publicIPAddress}</TableCell>
                                                    <TableCell>{peerSpecs.cpu}</TableCell>
                                                    <TableCell>{(ram)} GB</TableCell>
                                        </TableRow>
                                        </TableBody>
                                        
                                    </Table>
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="language">Language</Label>
                                    <Select>
                                        <SelectTrigger id="language">
                                            <SelectValue placeholder={project.language} />
                                        </SelectTrigger>
                                        {/* <SelectContent position="popper">
                                            <SelectItem value="cplusplus">C++</SelectItem>
                                            <SelectItem value="c">C</SelectItem>
                                            <SelectItem value="python">Python</SelectItem>
                                            <SelectItem value="csharp">C#</SelectItem>
                                        </SelectContent> */}
                                    </Select>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline">Delete</Button>
                        <Button onClick={executeProject}>Execute</Button>
                    </CardFooter>
                </Card>
            </DashboardLayout>
            <ToastContainer />
        </>
    )
}