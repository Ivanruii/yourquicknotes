import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
  closeImageDialog$,
  imageDialogState$,
  imageUploadHandler$,
  saveImage$,
} from "@mdxeditor/editor";
import { useCellValues, usePublisher } from "@mdxeditor/gurx";
import {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/common/components/ui/dialog";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/common/components/ui/form";
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";

interface ImageFormFields {
  src: string;
  title: string;
  altText: string;
  file: FileList;
}

interface ImageDialogState {
  type: "editing" | "inactive" | "view";
  initialValues?: ImageFormFields;
}

export const ImageDialog: React.FC = () => {
  const [state] = useCellValues(imageDialogState$, imageUploadHandler$) as [
    ImageDialogState,
    null
  ];

  const saveImage = usePublisher(saveImage$);
  const closeImageDialog = usePublisher(closeImageDialog$);

  const methods = useForm<ImageFormFields>({
    defaultValues:
      state.type === "editing"
        ? state.initialValues
        : {
            src: "",
            title: "",
            altText: "",
            file: {} as FileList,
          },
  });

  const { register, handleSubmit, reset } = methods;

  return (
    <Dialog
      open={state.type !== "inactive"}
      onOpenChange={(open) => {
        if (!open) {
          closeImageDialog();
          reset({ src: "", title: "", altText: "", file: {} as FileList });
        }
      }}
    >
      <DialogOverlay />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Image Upload Dialog</DialogTitle>
          <DialogDescription>
            Use this form to provide an image URL.
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(saveImage)}>
            <FormItem className="mb-4">
              <FormLabel htmlFor="src">Add an image from an URL:</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  id="src"
                  {...register("src")}
                  placeholder="Select or paste an image src"
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem className="mb-4">
              <FormLabel htmlFor="alt">Alt:</FormLabel>
              <FormControl>
                <Input type="text" id="alt" {...register("altText")} />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem className="mb-4">
              <FormLabel htmlFor="title">Title:</FormLabel>
              <FormControl>
                <Input type="text" id="title" {...register("title")} />
              </FormControl>
              <FormMessage />
            </FormItem>

            <DialogFooter>
              <Button
                type="submit"
                variant={"outline"}
                title="Save"
                aria-label="Save"
              >
                Save
              </Button>
              <DialogClose asChild>
                <Button
                  type="button"
                  title="Cancel"
                  aria-label="Cancel"
                  onClick={() => {
                    closeImageDialog();
                    reset({
                      src: "",
                      title: "",
                      altText: "",
                      file: {} as FileList,
                    });
                  }}
                >
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
