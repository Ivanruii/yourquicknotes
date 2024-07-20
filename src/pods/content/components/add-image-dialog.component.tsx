import React from "react";
import { useForm } from "react-hook-form";
import {
  closeImageDialog$,
  imageDialogState$,
  imageUploadHandler$,
  saveImage$,
} from "@mdxeditor/editor";
import { useCellValues, usePublisher } from "@mdxeditor/gurx";
import { Modal } from "@/common/components/";

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

  const { register, handleSubmit, reset } = useForm<ImageFormFields>({
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

  return (
    <Modal
      isOpen={state.type !== "inactive"}
      onClose={() => {
        closeImageDialog();
        reset({ src: "", title: "", altText: "", file: {} as FileList });
      }}
      title={"Image Upload Dialog"}
      description={
        "Use this form to upload an image from your device or provide an image URL."
      }
    >
      <form
        onSubmit={(e) => {
          void handleSubmit(saveImage)(e);
          reset({ src: "", title: "", altText: "", file: {} as FileList });
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <div className="mb-4">
          <label htmlFor="src" className="block mb-2 text-gray-700">
            {"Add an image from an URL:"}
          </label>
          <input
            type="text"
            id="src"
            {...register("src")}
            className="block w-full text-sm text-gray-900 border-gray-300 rounded-md"
            placeholder={"Select or paste an image src"}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="alt" className="block mb-2 text-gray-700">
            {"Alt:"}
          </label>
          <input
            type="text"
            id="alt"
            {...register("altText")}
            className="block w-full text-sm text-gray-900 border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="title" className="block mb-2 text-gray-700">
            {"Title:"}
          </label>
          <input
            type="text"
            id="title"
            {...register("title")}
            className="block w-full text-sm text-gray-900 border-gray-300 rounded-md"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-500 rounded-md"
            title={"Save"}
            aria-label={"Save"}
          >
            {"Save"}
          </button>
          <button
            type="button"
            className="px-4 py-2 text-gray-700 bg-gray-300 rounded-md"
            title={"Cancel"}
            aria-label={"Cancel"}
            onClick={() => {
              closeImageDialog();
              reset({ src: "", title: "", altText: "", file: {} as FileList });
            }}
          >
            {"Cancel"}
          </button>
        </div>
      </form>
    </Modal>
  );
};
