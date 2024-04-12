import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

type PrivateLayoutProps = {
  children?: ReactNode;
};

export const PrivateLayout = ({ children = <Outlet /> }: PrivateLayoutProps) => {
  return <main className="flex-1 flex-col flex bg-[#F9F9FA] h-screen overflow-y-auto">{children}</main>;
};
