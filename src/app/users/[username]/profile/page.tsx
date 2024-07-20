"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormEvent, useEffect, useState } from "react";
import { ProfileData } from "@/query/userClient";
import UserClient from "@/query/userClient";

const ProfilePage = () => {
  const username = useSelector((state: RootState) => state.profile.username);
  const [formData, setFormData] = useState<ProfileData>({
    username: "",
    name: "",
    email: "",
  });

  useEffect(() => {
    UserClient.getUserData(username).then(data => setFormData(data));
  }, []);

  const onChangeHandler = (event: any) => {
    setFormData(prevState => ({...prevState, [event.target.name]: event.target.value}))
  };

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    UserClient.editUserData(username, formData);
  };

  return (
    <div>
      <form
        className="border-b-[1px] border-gray-200 p-2"
        onSubmit={onSubmitHandler}
      >
          <Input
            name="username"
            className="max-w-56 mb-2"
            value={formData.username}
            onChange={onChangeHandler}
          />
          <Input
            name="name"
            className="max-w-56 mb-2"
            value={formData.name}
            onChange={onChangeHandler}
          />
          <Input
            name="email"
            className="max-w-56 mb-2"
            value={formData.email}
            onChange={onChangeHandler}
          />
          <Button className="w-20" type="submit">
            Save
          </Button>
      </form>
    </div>
  );
};

export default ProfilePage;
