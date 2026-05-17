export default function Heading({ children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <h1 className="mb-4 text-slate-800">{children}</h1>
    )
}