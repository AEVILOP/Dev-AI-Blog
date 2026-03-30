import BlogEditor from "./BlogEditor";
import BlogPreview from "./BlogPreview";

export default function BlogLayout({
  title, setTitle,
  fields, setField,
  repoLanguage,
  tone,
  actions,
  extras
}) {
  return (
    <div className="flex min-h-full w-full flex-col bg-black text-white lg:flex-row">
      <div className="custom-scrollbar flex w-full flex-col justify-between overflow-y-auto border-b border-neutral-900 p-4 sm:p-6 md:p-10 lg:w-5/12 lg:border-b-0 lg:border-r">
        <div className="space-y-8">
          {extras.error && (
            <div className="border border-red-900 bg-red-950/30 px-4 py-3">
              <span className="font-barlow text-xs font-bold text-red-500">{extras.error}</span>
            </div>
          )}

          {extras.readmeNote && (
            <div className="border border-orange-900/40 bg-orange-950/20 px-4 py-3">
              <span className="font-barlow text-xs font-bold text-orange-500">{extras.readmeNote}</span>
            </div>
          )}

          <BlogEditor
            title={title}
            setTitle={setTitle}
            fields={fields}
            setField={setField}
          />
        </div>

        <div className="mt-10 border-t border-neutral-900 pt-8 sm:mt-12">
          <div className="flex flex-col gap-4 lg:gap-5">
            {extras.regenProps}

            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <button
                onClick={actions.onSaveDraft}
                disabled={actions.saving}
                className="w-full rounded-3xl border border-neutral-800 px-6 py-3 font-barlow text-xs font-black uppercase tracking-widest text-neutral-400 transition-colors hover:border-neutral-600 hover:text-white sm:w-auto"
              >
                SAVE DRAFT
              </button>

              <button
                onClick={actions.onPublish}
                disabled={actions.saving}
                className="w-full rounded-3xl border border-orange-500 bg-orange-500 px-6 py-3 font-barlow text-xs font-black uppercase tracking-widest text-black transition-colors hover:bg-black hover:text-orange-500 sm:w-auto"
              >
                PUBLISH
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="custom-scrollbar w-full overflow-y-auto bg-neutral-950 p-4 sm:p-6 md:p-10 lg:w-7/12">
        <BlogPreview
          title={title}
          fields={fields}
          repoLanguage={repoLanguage}
          tone={tone}
        />
      </div>
    </div>
  );
}
