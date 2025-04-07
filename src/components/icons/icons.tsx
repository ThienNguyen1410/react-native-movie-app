import { Image, ImageStyle, StyleProp } from "react-native";


export const HomeIcon = () => {
  return (
    <Image style={{width: 24, height: 24}} source={require(`../../assets/icons/home.png`)}/>
  );
};

export const BookmarkIcon = () => {
  return (
    <Image style={{width: 24, height: 24}} source={require(`../../assets/icons/bookmark.png`)}/>
  );
};

