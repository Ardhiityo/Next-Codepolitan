import { ChevronLeftIcon } from "@heroicons/react/16/solid";
import { ChevronRightIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

type Meta = {
    pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
    };
};

export default function Pagination({ meta }: { meta: Meta }) {
    return (
        <>
            <section className="my-5 flex gap-2 items-center">
                {meta.pagination.page > 1 && (
                    <button className="bg-slate-200 px-3 py-2 rounded-2xl">
                        <Link href={`/blog?page=${meta.pagination.page - 1}`}>
                            <ChevronLeftIcon className="w-7" />
                        </Link>
                    </button>
                )}
                <p>Page {meta.pagination.page} of {meta.pagination.pageCount}</p>
                {meta.pagination.page < meta.pagination.pageCount && (
                    <button className="bg-slate-200 px-3 py-2 rounded-2xl">
                        <Link href={`/blog?page=${meta.pagination.page + 1}`}>
                            <ChevronRightIcon className="w-7" />
                        </Link>
                    </button>
                )}
            </section>
        </>
    )
}