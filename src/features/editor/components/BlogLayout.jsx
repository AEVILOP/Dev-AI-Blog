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
    <div className="flex flex-col lg:flex-row h-full w-full bg-black text-white">

      {/* LEFT SIDE — EDITOR & SETTINGS */}
      <div className="w-full lg:w-5/12 border-b lg:border-b-0 lg:border-r border-neutral-900 overflow-y-auto p-6 md:p-10 flex flex-col justify-between custom-scrollbar">
        
        <div className="space-y-8">
          {extras.error && (
            <div className="px-4 py-3 bg-red-950/30 border border-red-900">
              <span className="font-barlow font-bold text-xs text-red-500">{extras.error}</span>
            </div>
          )}
          
          {extras.readmeNote && (
            <div className="px-4 py-3 bg-orange-950/20 border border-orange-900/40">
              <span className="font-barlow font-bold text-xs text-orange-400">{extras.readmeNote}</span>
            </div>
          )}

          <BlogEditor 
            title={title} 
            setTitle={setTitle} 
            fields={fields} 
            setField={setField} 
          />
        </div>

        {/* Action Panel */}
        <div className="mt-12 pt-8 border-t border-neutral-900">
          <div className="flex items-center justify-between">
            {extras.regenProps}
            
            <div className="flex gap-4">
              <button
                onClick={actions.onSaveDraft}
                disabled={actions.saving}
                className="font-barlow font-black text-xs tracking-widest uppercase border border-neutral-800 text-neutral-400 px-6 py-3 hover:text-white hover:border-neutral-600 transition-colors rounded-3xl"
              >
                SAVE DRAFT
              </button>
              
              <button
                onClick={actions.onPublish}
                disabled={actions.saving}
                className="font-barlow font-black text-xs tracking-widest uppercase bg-orange-500 text-black px-6 py-3 hover:bg-black hover:text-orange-500 border border-orange-500 transition-colors rounded-3xl"
              >
                PUBLISH
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE — PREVIEW RE-RENDER */}
      <div className="w-full lg:w-7/12 overflow-y-auto bg-neutral-950 p-6 md:p-10 custom-scrollbar">
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