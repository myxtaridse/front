import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, fetchTags } from "../../redux/slices/postsSlice";
import { fetchUserAll } from "../../redux/slices/authSlice";
import styles from "./Main.module.scss";
import { DetailedCard, Loading, Toast } from "../../components/index";

const Main = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(false);
  const [copyAlert, setCopyAlert] = React.useState(false);
  const [isChangePost, setIsChangePost] = React.useState(false);
  const successPosts = useSelector((state) => state.postsSlice.post.status);
  const allUsers = useSelector((state) => state.authSlice.dataUserAll);
  const posts = useSelector((state) => state.postsSlice.post.items);

  React.useEffect(() => {
    if (successPosts === "loading") {
      setIsLoading(true);
    } else if (successPosts === "success") {
      setIsLoading(false);
    }
  }, [successPosts]);

  React.useEffect(() => {
    try {
      dispatch(fetchPosts());
      dispatch(fetchTags());
      dispatch(fetchUserAll());
      setTimeout(() => {
        window.scrollTo(0, sessionStorage.getItem("scrollPos") || 0);
        sessionStorage.clear();
      }, 500);
    } catch (err) {
      console.log(err);
    }
  }, [isChangePost, dispatch]);

  if (successPosts === "loading") {
    return <Loading isLoading={isLoading} setIsLoading={setIsLoading} />;
  }

  return (
    <div className={styles.main}>
      {!posts && isLoading ? (
        <Loading />
      ) : (
        posts?.map(
          (
            {
              createdAt,
              tags,
              title,
              viewsCount,
              user,
              imageUrl,
              likes,
              comments,
              _id,
            },
            id
          ) => (
            <DetailedCard
              key={id}
              id={_id}
              user={user}
              imageUrl={imageUrl}
              likes={likes}
              comments={comments}
              viewsCount={viewsCount}
              title={title}
              tags={tags}
              createdAt={createdAt}
              isChangePost={isChangePost}
              setIsChangePost={setIsChangePost}
              setCopyAlert={setCopyAlert}
              allUsers={allUsers}
            />
          )
        )
      )}
      {copyAlert && (
        <div className={styles.main__alert}>
          <Toast
            title="Буфер обмена"
            subTitle="Ссылка на аккаунт скопирована!"
            copyAlert={copyAlert}
            setCopyAlert={setCopyAlert}
          />
        </div>
      )}
    </div>
  );
};

export default Main;
