import Head from "next/head";
import List from "@/components/list";

export default function Home() {
  return (
    <>
      <Head>
        <meta
          name="google-site-verification"
          content="au35IWAv6wyNMRau1Dq5Srahtv6GFA3uWlkYX86p5LA"
        />
      </Head>
      <main className="flex flex-col justify-center items-center w-full h-screen">
        <section className="w-3/5 bg-neutral-100 rounded-lg p-10">
          <List />
        </section>

        <footer className="w-3/5 bg-white rounded-lg shadow m-4 mt-14 dark:bg-gray-800">
          <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              dsy0302@gmail.com
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
              <li>
                <a
                  href="https://github.com/datoybi/work-time-caclulator"
                  className="hover:underline me-4 md:me-6"
                >
                  Github
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </main>
    </>
  );
}
