import React from "react";
import styles from "./User.module.scss";
import { useDispatch, useSelector } from "react-redux";
import CardUser from "../../components/CardUser";
import { useParams } from "react-router-dom";

import HeaderAccount from "../../components/HeaderAccount";
import OpenPost from "../../components/OpenPost";

import EditMyPage from "../../components/EditMyPage";
import AddNewPost from "../../components/AddNewPost";

import { fetchUser } from "../../redux/slices/authSlice";
import { fetchPosts } from "../../redux/slices/postsSlice";
import Loading from "../../components/Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import SubPopup from "../../components/SubPopup";

const User = ({ setIsIdRequest }) => {
  const aboutMe = useSelector((state) => state.authSlice.dataUser);
  const postsAllMain = useSelector((state) => state.postsSlice.post.items);

  const [isOpenPost, setIsOpenPost] = React.useState(false);
  const [isPutValue, setIsPutValue] = React.useState(0);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [statePosts] = React.useState();
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [isOpenNewPost, setIsOpenNewPost] = React.useState(false);
  const [isSubPopup, setIsSubPopup] = React.useState(false);

  const [postsView, setPostsView] = React.useState([]);
  const myData = useSelector((state) => state?.userSlice.dataMyAcc);
  const [isChangePost, setIsChangePost] = React.useState(false);

  const myId = JSON.parse(localStorage.getItem("data"));
  const { id } = useParams();
  const dispatch = useDispatch();

  const postsAll = postsAllMain
    ?.filter((post) => post.user._id === id)
    .reverse();

  const successMe = useSelector((state) => state.authSlice.status);
  const successUser = useSelector((state) => state.userSlice.status);
  const successPosts = useSelector((state) => state.postsSlice.post.status);

  React.useEffect(() => {
    dispatch(fetchUser(id));
    dispatch(fetchPosts());
  }, [isChangePost, dispatch, id]);

  // if (status === "success") {
  //   console.log("yes");
  // } else {
  //   console.log("no");
  // }

  //console.log(postsView);

  // React.useEffect(() => {
  //   const funRes = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:3000/postsByUser/${id}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem("token")}`,
  //           },
  //         }
  //       );
  //       setStatePosts(response.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   funRes();
  // }, []);

  // React.useEffect(() => {
  //   if (postsAll?.length > 0) {
  //     const newPostsAll = [...postsAll];
  //     setPostsView(newPostsAll.splice(0, 9));
  //   }
  // }, [postsAll]);

  // const nextHandler = () => {
  //   if (postsAll?.length > 0) {
  //     const newPostsAll = [...postsAll];
  //     const offset = 9 * (page + 1);
  //     setPostsView([...postsView, ...newPostsAll?.splice(offset, offset + 9)]);
  //     setPage(page + 1);
  //   }
  // };

  const putValues = (id) => {
    setIsOpenPost(true);
    setIsPutValue(id);
    console.log(id);
  };

  console.log(isChangePost);

  const postOne = postsAll[isPutValue];

  if (!successMe && !successUser && !successPosts) {
    return <Loading />;
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
        subscribed={aboutMe?.subscribed ? aboutMe?.subscribed.length : 0}
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
              <CardUser {...post} />
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.user__notPosts}>Постов нет</div>
      )}

      {/* <div
          className={styles.user__bg}
          ref={clickRef}
          onClick={onChangeBg}
        ></div> */}
      {isOpenPost && postOne && (
        <div className={styles.user__popup}>
          <OpenPost
            post={postOne}
            isChangePost={isChangePost}
            setIsChangePost={setIsChangePost}
            modalIsOpen={modalIsOpen}
            setIsOpen={setIsOpen}
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
            statePosts={statePosts}
            myData={myData}
            isSubPopup={isSubPopup}
            setIsSubPopup={setIsSubPopup}
            isChangePost={isChangePost}
            setIsChangePost={setIsChangePost}
          />
        </div>
      )}
    </div>
  );
};

export default User;
