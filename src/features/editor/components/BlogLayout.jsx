export default function BlogLayout({ editor, preview }) {
    return (
        <div className="flex h-screen bg-black text-white">

            {/* LEFT SIDE — EDITOR */}
            <div className="w-1/2 border-r border-neutral-900 overflow-y-auto p-10">
                {editor}
            </div>

            {/* RIGHT SIDE — PREVIEW */}
            <div className="w-1/2 overflow-y-auto bg-neutral-950 p-10">
                {preview}
            </div>

        </div>
    );
}