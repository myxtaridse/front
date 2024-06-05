import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchUser, fetchUserAll } from "../../redux/slices/authSlice";
import { fetchPosts } from "../../redux/slices/postsSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "./User.module.scss";
import {
  PostsUser,
  HeaderAccount,
  OpenPost,
  EditMyPage,
  AddNewPost,
  SubPopup,
  Loading,
} from "../../components/index";

const User = ({ setIsIdRequest }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = React.useState(false);

  const successMe = useSelector((state) => state.authSlice.status);
  const successUser = useSelector((state) => state.userSlice.status);
  const successPosts = useSelector((state) => state.postsSlice.post.status);
  const allUsers = useSelector((state) => state.authSlice.dataUserAll);
  const aboutMe = useSelector((state) => state.authSlice.dataUser);
  const postsAllMain = useSelector((state) => state.postsSlice.post.items);
  const myData = useSelector((state) => state?.userSlice.dataMyAcc);
  const userData = useSelector((state) => state?.authSlice?.dataUser);
  const myId = JSON.parse(localStorage.getItem("data"));
  const postsAll = postsAllMain
    ?.filter((post) => post.user._id === id)
    .reverse();

  const idFiltered = Boolean(myData?._id === id);

  const [isChangePost, setIsChangePost] = React.useState(false);
  const [isOpenPost, setIsOpenPost] = React.useState(false);
  const [isPutValue, setIsPutValue] = React.useState(0);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [statePosts] = React.useState();
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [isOpenNewPost, setIsOpenNewPost] = React.useState(false);
  const [isSubPopup, setIsSubPopup] = React.useState(false);
  const [isSubscribed, setIsSubscribed] = React.useState(false);
  const [isSubscribers, setIsSubscribers] = React.useState(false);

  const postOne = postsAll[isPutValue];

  React.useEffect(() => {
    try {
      dispatch(fetchUserAll());
      dispatch(fetchUser(id));
      dispatch(fetchPosts());
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, id]);

  React.useEffect(() => {
    if (
      successMe === "loading" ||
      successPosts === "loading" ||
      successUser === "loading"
    ) {
      setIsLoading(true);
    } else if (
      successMe === "success" ||
      successPosts === "success" ||
      successUser === "success"
    ) {
      setIsLoading(false);
    }
  }, [successMe, successPosts, successUser]);

  const putValues = (id) => {
    setIsOpenPost(true);
    setIsPutValue(id);
  };

  if (
    successMe === "loading" ||
    successPosts === "loading" ||
    successUser === "loading"
  ) {
    return <Loading isLoading={isLoading} setIsLoading={setIsLoading} />;
  }

  return (
    <div className={styles.user}>
      <HeaderAccount
        id={aboutMe?._id}
        avatarUrl={aboutMe?.avatarUrl}
        nickname={aboutMe?.nickname}
        postsLength={postsAll.length > 0 ? postsAll.length : 0}
        url={aboutMe?.url}
        description={aboutMe?.description}
        subscribers={aboutMe?.subscribers}
        subscribed={aboutMe?.subscribed}
        lastName={aboutMe?.lastName}
        firstName={aboutMe?.firstName}
        isMyPage={id === myData?._id}
        isMySubscription={aboutMe?.subscribers?.includes(myData?.id)}
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        isOpenNewPost={isOpenNewPost}
        setIsOpenNewPost={setIsOpenNewPost}
        setIsIdRequest={setIsIdRequest}
        statePosts={statePosts}
        myId={myData?._id}
        isChangePost={isChangePost}
        setIsChangePost={setIsChangePost}
        isSubPopup={isSubPopup}
        setIsSubPopup={setIsSubPopup}
        isSubscribed={isSubscribed}
        setIsSubscribed={setIsSubscribed}
        isSubscribers={isSubscribers}
        setIsSubscribers={setIsSubscribers}
        allUsers={allUsers}
      />

      {postsAll?.length > 0 ? (
        // <InfiniteScroll
        //   dataLength={postsView.length}
        //   next={nextHandler}
        //   hasMore={postsView.length < postsAll.length}
        //   loader={<Loading />}

        //   // endMessage={<p style={{ textAlign: "center" }}>Пора за работу!</p>}
        // >
        <div className={styles.user__body}>
          {postsAll?.map((post, id) => (
            <div
              className={styles.user__body__item}
              onClick={() => {
                putValues(id);
                setIsOpen(true);
              }}
            >
              <PostsUser {...post} />
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.user__notPosts}>Постов пока нет </div>
      )}

      {isOpenPost && postOne && (
        <div className={styles.user__popup}>
          <OpenPost
            post={postOne}
            isChangePost={isChangePost}
            setIsChangePost={setIsChangePost}
            modalIsOpen={modalIsOpen}
            setIsOpen={setIsOpen}
            allUsers={allUsers}
            id={id}
            myData={myData}
          />
        </div>
      )}
      {isOpenModal && (
        <div className={styles.user__popup}>
          <EditMyPage
            statePosts={statePosts}
            isOpenModal={isOpenModal}
            setIsOpenModal={setIsOpenModal}
            isChangePost={isChangePost}
            setIsChangePost={setIsChangePost}
          />
        </div>
      )}
      {isOpenNewPost && (
        <div className={styles.user__popup}>
          <AddNewPost
            statePosts={statePosts}
            myId={myId}
            isOpenNewPost={isOpenNewPost}
            setIsOpenNewPost={setIsOpenNewPost}
            isChangePost={isChangePost}
            setIsChangePost={setIsChangePost}
          />
        </div>
      )}
      {isSubPopup && (
        <div className={styles.user__popup}>
          <SubPopup
            subs={isSubscribed ? userData?.subscribed : userData?.subscribers}
            isSubPopup={isSubPopup}
            setIsSubPopup={setIsSubPopup}
            isChangePost={isChangePost}
            setIsChangePost={setIsChangePost}
            titleModal={isSubscribed ? "Подписки" : "Подписчики"}
            setIsSubscribed={setIsSubscribed}
            setIsSubscribers={setIsSubscribers}
            isSubscribed={idFiltered && isSubscribed}
            myData={myData}
            aboutMe={aboutMe}
            allUsers={allUsers}
          />
        </div>
      )}
    </div>
  );
};

export default User;
