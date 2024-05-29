import React from "react";
import DetailedCard from "../../components/DetailedCard";
import Loading from "../../components/Loading";

import styles from "./Main.module.scss";

import { useDispatch, useSelector } from "react-redux";

import { fetchPosts, fetchTags } from "../../redux/slices/postsSlice";

// import { getAuthorizedUser } from "../../redux/actions/user";

const Main = () => {
  const dispatch = useDispatch();
  const [isLikedByYou, setIsLikedByYou] = React.useState(false);

  const posts = useSelector((state) => state.postsSlice.post.items);
  console.log(posts);

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, [isLikedByYou, dispatch]);

  // React.useEffect(() => {
  //   const funRes = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:3000/postsByUser", {
  //         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  //       });
  //       setStatePosts(response.data);
  //     } catch (err) {
  //       console.log(err);
  //       navigate("/auth");
  //       localStorage.clear();
  //     }
  //   };
  //   funRes();
  // }, []);

  // const postsAllMain = statePosts?.filter((post) => post.posts?.length > 0);

  // const postsMaped = postsAllMain?.map((post) =>
  //   post.posts.filter((post) => post.likes.length > 2)
  // );

  return (
    <div className={styles.main}>
      {!posts ? (
        <Loading />
      ) : (
        posts?.map(
          ({
            createdAt,
            tags,
            title,
            viewsCount,
            user,
            imageUrl,
            likes,
            comments,
            _id,
          }) => (
            <DetailedCard
              key={_id}
              id={_id}
              user={user}
              imageUrl={imageUrl}
              likes={likes}
              comments={comments}
              viewsCount={viewsCount}
              title={title}
              tags={tags}
              createdAt={createdAt}
              isLikedByYou={isLikedByYou}
              setIsLikedByYou={setIsLikedByYou}
            />
          )
        )
      )}
    </div>
  );
};

export default Main;
