'use client';

import { useState } from "react";
import { LinkIcon } from "@heroicons/react/16/solid";

export default function CopyLinkButton() {
    const [copied, setCopied] = useState(false);

    function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        e.stopPropagation();
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }
    return (
        <button className="bg-slate-400 flex gap-1 hover:bg-slate-600 hover:text-slate-200 p-2 rounded-2xl" onClick={handleClick}>
            <LinkIcon className="w-5"/>
            {copied ? 'Link Copied' : 'Copy Link'}
        </button>
    )
}