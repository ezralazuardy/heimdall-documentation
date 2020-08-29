module.exports = {
    title: 'Heimdall',
    tagline: 'Painless OAuth 2.0 Server for CodeIgniter 4 🔥',
    url: 'https://github.com/ezralazuardy/heimdall',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    favicon: 'img/favicon.ico',
    organizationName: 'ezralazuardy',
    projectName: 'heimdall',
    themeConfig: {
        navbar: {
            title: 'Heimdall',
            logo: {
                alt: 'Heimdall Logo',
                src: 'img/heimdall-logo.png',
            },
            items: [
                {
                    to: 'documentation',
                    activeBasePath: 'documentation',
                    label: 'Documentation',
                    position: 'left',
                },
                {
                    to: 'blog',
                    label: 'Blog',
                    position: 'left'
                },
                {
                    href: 'https://github.com/ezralazuardy/heimdall',
                    label: 'GitHub',
                    position: 'right',
                },
            ],
        },
        footer: {
            style: 'dark',
            links: [
                {
                    title: 'Community',
                    items: [
                        {
                            label: 'Stack Overflow',
                            href: 'https://stackoverflow.com/questions/tagged/heimdall',
                        },
                    ],
                },
                {
                    title: 'More',
                    items: [
                        {
                            label: 'Blog',
                            to: 'blog',
                        },
                        {
                            label: 'GitHub',
                            href: 'https://github.com/ezralazuardy/heimdall',
                        },
                    ],
                },
            ],
            copyright: `Built with ❤ by Ezra Lazuardy`,
        },
    },
    presets: [
        [
            '@docusaurus/preset-classic',
            {
                docs: {
                    routeBasePath: 'documentation',
                    sidebarPath: require.resolve('./sidebars.js'),
                    editUrl:
                        'https://github.com/ezralazuardy/heimdall-documentation/edit/master/website/',
                },
                blog: {
                    showReadingTime: false,
                    blogDescription: "Heimdall's Blog 📖",
                    editUrl:
                        'https://github.com/ezralazuardy/heimdall-documentation/edit/master/website/blog/',
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            },
        ],
    ],
};
