'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome } from 'react-icons/fa';
import { FaChevronRight } from 'react-icons/fa6';

interface BreadcrumbItem {
    label: string;
    href: string;
}

const generateBreadcrumbs = (pathname: string): BreadcrumbItem[] => {
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
        { label: 'Home', href: '/' }
    ];

    let currentPath = '';
    segments.forEach((segment, index) => {
        currentPath += `/${segment}`;

        const label = segment
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        if (index === segments.length - 1) {
            breadcrumbs.push({ label, href: currentPath });
        } else {
            breadcrumbs.push({ label, href: currentPath });
        }
    });

    return breadcrumbs;
};

export const Breadcrumb = () => {
    const pathname = usePathname();
    const breadcrumbs = generateBreadcrumbs(pathname);

    return (
        <nav className="bg-white/10 backdrop-blur-sm " aria-label="Breadcrumb">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center h-14">
                    <ol className="flex items-center space-x-1">
                        {breadcrumbs.map((item, index) => {
                            const isLast = index === breadcrumbs.length - 1;
                            const isHome = item.label === 'Home';

                            return (
                                <li key={item.href} className="flex items-center">
                                    {index > 0 && (
                                        <FaChevronRight className="w-4 h-4 text-gray-400 mx-1" />
                                    )}
                                    {isLast ? (
                                        <span className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 cursor-default">
                                            {isHome && <FaHome className="w-4 h-4" />}
                                            {item.label}
                                        </span>
                                    ) : (
                                        <Link
                                            href={item.href}
                                            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                                        >
                                            {isHome && <FaHome className="w-4 h-4" />}
                                            {item.label}
                                        </Link>
                                    )}
                                </li>
                            );
                        })}
                    </ol>
                </div>
            </div>
        </nav>
    );
};
