import DashboardLayout from "./layout";
import CodeSection from "@/components/CodeSection";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
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
import { FolderUpload } from "@/components/FolderUpload";

export default function Configure() {
    return (
        <>
            <DashboardLayout>
                <h1 style={{ fontWeight: 'bold', fontSize: 30, marginBottom: 20 }}>Configuration</h1>
                    {/* <Card className="w-[350px] mt-5">
                        <CardHeader>
                            <CardTitle>Create project</CardTitle>
                            <CardDescription>Deploy your new project in one-click.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form>
                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="name">Name</Label>
                                        <Input id="name" placeholder="Name of your project" />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="language">Language</Label>
                                        <Select>
                                            <SelectTrigger id="language">
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent position="popper">
                                                <SelectItem value="cplusplus">C++</SelectItem>
                                                <SelectItem value="c">C</SelectItem>
                                                <SelectItem value="python">Python</SelectItem>
                                                <SelectItem value="csharp">C#</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline">Cancel</Button>
                            <Button>Deploy</Button>
                        </CardFooter>
                    </Card> */}
                    {/* <div className="grid w-full max-w-sm items-center gap-1.5">
                        <FolderUpload />
                    </div> */}
                    <CodeSection/>
            </DashboardLayout>
        </>
    )
}