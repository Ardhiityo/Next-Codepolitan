import Link from "next/link"

export default function Navbar() {
    return (
        <header>
            <ul className="flex gap-2 py-5">
                <li><Link href='/' className="text-gray-600 hover:underline hover:text-gray-400">Home</Link></li>
                <li><Link href='/blog' className="text-gray-600 hover:underline hover:text-gray-400">Blog</Link></li>
                <li><Link href='/contact' className="text-gray-600 hover:underline hover:text-gray-400">Contact</Link></li>
            </ul>
        </header>
    )
}