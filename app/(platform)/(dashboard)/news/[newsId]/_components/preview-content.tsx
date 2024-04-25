import { FormInput } from "@/components/form/form-input";
import { FormSelect } from "@/components/form/form-select";
import { FormTextarea } from "@/components/form/form-textarea";

export const PreviewContent = () => {
  return (
    <div className="w-1/2 mx-auto my-5 border bg-slate-200/5 border-[#454f5e] p-8 rounded-xl shadow-2xl">
      <div className="my-5 relative z-10">
        <FormSelect
          id="category"
          className="
            bg-[#21262d]
            text-neutral-200
            

        "
        />
      </div>

      <div className="my-5 relative z-10">
        <FormInput
          id="title"
          label="Title*"
          placeholder="Post title"
          required
          className="
                py-6
                w-full
                focus:border-[1px]
                border-0
                border-l-rose-500
                focus:border-l-slate-300
                caret-sky-600
                rounded-xl
                focus:ring-0
                focus:ring-offset-0
                focus:ring-offset-slate-200
                focus:ring-slate-300
                focus:ring-opacity-50
                shadow-inset-left-rose-500
                text-lg
                text-[#a8b3d0]
                hover:text-[#fffff]
                hover:bg-[#21262d]
                bg-[#1a1f25]
                focus:bg-[#21262d]
                transition
        "
        />
      </div>

      <div className="my-5 relative z-10">
        <FormTextarea
          id="content"
          label="Content*"
          placeholder="Post content*"
          required
          className="
              bg-[#1a1f25]
                pl-4
                border-0
                focus:border-[1px]
                caret-sky-600
                h-56
                text-[#a8b3d0]
                text-base
                rounded-xl
                focus:ring-0
                focus:ring-offset-0
                focus:ring-offset-slate-200
                focus:ring-slate-300
                focus:ring-opacity-50
                hover:bg-[#21262d]
                focus:bg-[#21262d]
                focus:border-slate-200
                transition
        "
        />
      </div>
    </div>
  );
};
