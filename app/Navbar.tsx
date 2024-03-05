'use client';
import Link from 'next/link';
import React from 'react';
// import { AiFillBug } from 'react-icons/ai';
import classnames from 'classnames';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from '@radix-ui/themes';
export default function Navbar() {
  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex gap="3" className="items-center">
            <Link href={'/'}>{/* <AiFillBug /> */}</Link>

            <NavLinks />
          </Flex>

          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
}

const NavLinks = () => {
  //
  const currentPath = usePathname();
  //
  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Posts', href: '/posts/list' },
  ];
  //
  return (
    <ul className=" flex space-x-6">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            // className={`${
            //   w.href === currentPath ? 'text-zinc-900 ' : 'text-zinc-500 '
            // } hover: text-zinc-500 transition-colors`}

            className={classnames({
              'text-zinc-900': link.href === currentPath,
              'text-zinc-500': link.href !== currentPath,
              'hover: text-zinc-500 transition-colors`': true,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};
const AuthStatus = () => {
  //
  const { status, data: session } = useSession();
  // console.log(session);
  if (status === 'loading') {
    return 'loading..';
  }
  if (status === 'unauthenticated') {
    return <Link href={'/api/auth/signin'}>Sign in</Link>;
  }
  //

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            className="cursor-pointer"
            // src={session!.user!.image!}
            src={
              'https://lh3.googleusercontent.com/a/ACg8ocKpDDffIBF_kUcbLrHxWgcLM3dgI8t8kjZI5qwGgL-V=s96-c'
            }
            // if session.user.image is null or undefined
            fallback="?"
            radius="full"
            size="2"
            referrerPolicy="no-referrer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">{session!.user?.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href={'/api/auth/signout'}>Sign out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};
