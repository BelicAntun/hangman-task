import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

type PrivateLayoutProps = {
  children?: ReactNode;
};

export const PrivateLayout = ({ children = <Outlet /> }: PrivateLayoutProps) => {
  const { username } = useSelector((state: { user: { username: string } }) => state.user);

  if (!username) {
    window.location.replace('/');
  }

  return <main className="flex-1 flex-col flex bg-[#F9F9FA] h-screen overflow-y-auto">{children}</main>;
};
