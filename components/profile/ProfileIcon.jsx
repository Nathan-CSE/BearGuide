import React from 'react';
import { Image } from 'react-native';
import { Avatar } from 'react-native-paper';

const ProfileIcon = ({ user }) => {
  if (user && user.profile_image) {
    return (
      <Image
        source={{ uri: user.profile_image }}
        style={{ height: 80, width: 80, borderRadius: 40 }}
      />
    );
  }
  return <Avatar.Icon icon="account" size={80} />;
};

export default ProfileIcon;
