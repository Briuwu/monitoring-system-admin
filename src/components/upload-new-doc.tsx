import { useState, useTransition } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CloudUpload, Paperclip } from "lucide-react";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/file-upload";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUpdateRequirementDocumentReference } from "@/hooks/requirements";
import { uploadToCloudinary } from "@/cloudinary-config";
import { useNavigate } from "react-router";

const formSchema = z.object({
  documentReference: z.string({
    required_error: "Document reference is required.",
  }),
});

export function UploadNewDoc({
  documentId,
  department,
  isClient,
}: {
  documentId: string;
  department: string;
  isClient?: boolean;
}) {
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();
  const { mutate: updateDocumentRef } =
    useUpdateRequirementDocumentReference(documentId);
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<File[] | null>(null);

  const dropZoneConfig = {
    maxFiles: 5,
    maxSize: 1024 * 1024 * 4,
    multiple: true,
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      documentReference: "",
    },
  });

  const generateToken = (department: string) => {
    const year = new Date().getFullYear();
    const randomKey = Math.random().toString(36).substring(2, 6).toUpperCase();
    const departmentPrefix = department.substring(0, 2).toUpperCase(); // Get first 2 letters of the department
    return `${departmentPrefix}-${year}-${randomKey}`;
  };

  function onSubmit() {
    if (!files || files.length === 0) {
      toast.error("Please upload a document reference.");
      return;
    }
    startTransition(async () => {
      const fileUrl = await uploadToCloudinary(files![0]);
      try {
        updateDocumentRef({
          documentReference: generateToken(department),
          uploadedFileUrl: fileUrl,
        });
        toast.success("Document uploaded successfully.");
        setOpen(false);
        navigate(
          `/${isClient ? "client" : "dashboard"}/requirements/${documentId}`,
          { replace: true }
        );
      } catch (error) {
        console.error("Form submission error", error);
        toast.error("Failed to submit the form. Please try again.");
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="min-h-[100px] bg-amber-500 font-black uppercase text-lg">
          Upload New Document
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload New Document</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="documentReference"
              render={() => (
                <FormItem>
                  <FormLabel>Select File</FormLabel>
                  <FormControl>
                    <FileUploader
                      value={files}
                      onValueChange={setFiles}
                      dropzoneOptions={dropZoneConfig}
                      className="relative bg-background rounded-lg p-2"
                    >
                      <FileInput
                        id="fileInput"
                        className="outline-dashed outline-1 outline-slate-500"
                      >
                        <div className="flex items-center justify-center flex-col p-8 w-full ">
                          <CloudUpload className="text-gray-500 w-10 h-10" />
                          <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                              Click to upload
                            </span>
                            &nbsp; or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF
                          </p>
                        </div>
                      </FileInput>
                      <FileUploaderContent>
                        {files &&
                          files.length > 0 &&
                          files.map((file, i) => (
                            <FileUploaderItem key={i} index={i}>
                              <Paperclip className="h-4 w-4 stroke-current" />
                              <span>{file.name}</span>
                            </FileUploaderItem>
                          ))}
                      </FileUploaderContent>
                    </FileUploader>
                  </FormControl>
                  <FormDescription>Select a file to upload.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
