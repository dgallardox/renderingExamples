import styles from "../styles/Home.module.css";
import Link from "next/link";
import Image from "next/image";
import { gql } from "@apollo/client";
import client from "../apollo-client";

export default function Home({ posts }) {

  function convertDate(unconvertedDate) {
    let newDate = unconvertedDate.split(/[-T]+/);
    return `${newDate[2]}-${newDate[1]}-${newDate[0]}`;
  }

  return (
    <>
      <div id={styles.heroText}>DAILY BYTE</div>
      <div id={styles.navBar}>
        <ul id={styles.list}>
          <li id={styles.li}>
            <Link href="https://hxe6cb2lqipzyhl51y1keqw92.js.wpenginepowered.com/">
              Static
            </Link>
          </li>
          <li id={styles.li}>
            <p id={styles.active}>Server</p>
          </li>
          <li id={styles.li}>
            <Link href="https://h6d1uw5uhqj1e99ot4pe390b9.js.wpenginepowered.com/">
              Client
            </Link>
          </li>
        </ul>
      </div>
      <>
        {posts.map(({ date, title, excerpt, featuredImage }) => {
          return (
            <>
                <div id={styles.card}>
                <div id={styles.imageDiv}>
                  <Image
                        alt="Featured Image"
                        src={featuredImage?.node.sourceUrl}
                        layout="fill"
                        width="100%"
                        height="100%"
                      />
                  </div>
                  <h5 id={styles.title}>{title}</h5>
                  <p>{convertDate(date)}</p>
                  <div>
                    <div
                      id={styles.body}
                      dangerouslySetInnerHTML={{ __html: excerpt }}
                    />
                  </div>
                </div>
            </>
          );
        })}
      </>
    </>
  );
}

export const getServerSideProps = async () => {
  const { data } = await client.query({
    query: gql`
      query allPosts {
        posts {
          nodes {
            id
            slug
            title
            date
            content
            excerpt
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
      }
    `,
  });

  return {
    props: {
      posts: data.posts.nodes,
    },
  };
};
