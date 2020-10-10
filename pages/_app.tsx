import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { Avatar } from '@self/components/Avatar';
import { Input } from '@self/components/Input';
import { useCurrentTime } from '@self/lib/hooks/useCurrentTime';
import { useOutsideClick } from '@self/lib/hooks/useOutsideClick';
import { darkTheme, defaultTheme } from '@self/lib/styles/theme';
import { Themed, ThemedCSS } from '@self/lib/types';
import { ThemeProvider } from 'emotion-theming';
import { AppType } from 'next/dist/next-server/lib/utils';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {
  Bell,
  ChevronDown,
  Clock,
  Database,
  Folder,
  Home,
  Info,
  List,
  Lock,
  LogOut,
  Mail,
  Menu,
  Moon,
  PieChart,
  Search,
  Settings,
  Sun,
  Users,
  Volume2,
  X,
} from 'react-feather';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import { animated as a, useSpring, useTransition } from 'react-spring';
import tw from 'twin.macro';
import create from 'zustand';
import shallow from 'zustand/shallow';
import '../styles/index.css';

const URL = 'https://picsum.photos/200/200';

const cache = new QueryCache();

type State = {
  darkMode: boolean;
  reduceMotion: boolean;
  setDarkMode: (value: boolean) => void;
  setReduceMotion: (value: boolean) => void;
};

export let useSettingsStore = create<State>((set) => {
  let status = typeof window === 'undefined' ? 'ssr' : 'client';
  let defaultSettings = {
    darkMode: false,
    reduceMotion: false,
  };

  if (status === 'client') {
    let localSettings = localStorage.getItem('settings');
    if (localSettings !== null) {
      defaultSettings = JSON.parse(localSettings);
    }
  }

  return {
    ...defaultSettings,
    setDarkMode: (value) => {
      set({ darkMode: value });
      let modifiedSettings = { ...defaultSettings, darkMode: value };
      localStorage.setItem('settings', JSON.stringify(modifiedSettings));
    },
    setReduceMotion: (value) => {
      set({ reduceMotion: value });
      let modifiedSettings = { ...defaultSettings, reduceMotion: value };
      localStorage.setItem('settings', JSON.stringify(modifiedSettings));
    },
  };
});

let App: AppType = (props) => {
  let { Component, pageProps, router } = props;
  let [mounted, setMounted] = useState(false);
  let [menuActive, setMenuActive] = useState(false);
  let [searchActive, setSearchActive] = useState(false);
  let { darkMode, setDarkMode } = useSettingsStore(
    ({ darkMode, setDarkMode }) => ({ darkMode, setDarkMode }),
    shallow,
  );
  let reduceMotion = useSettingsStore((s) => s.reduceMotion);
  let ref = useOutsideClick(() => {
    setMenuActive(false);
  });
  let time = useCurrentTime();
  // @ts-ignore
  let transitions = useTransition([{ id: router.route, Component, pageProps }], (item) => item.id, {
    from: { y: 65, opacity: 0 },
    leave: { y: -65, opacity: 0 },
    enter: { y: 0, opacity: 1 },
    immediate: reduceMotion,
  });

  let ap = useSpring({
    x: menuActive ? -49 : -100,
    immediate: reduceMotion,
    config: {
      friction: 18,
    },
  });

  useEffect(() => {
    if (mounted) {
      setTimeout(() => {
        document.body.classList.add('mounted');
      }, 100);
    }

    setMounted(true);
  }, [mounted]);

  useEffect(() => {
    function handler(url: string) {
      setMenuActive(false);
    }

    router.events.on('routeChangeComplete', handler);
    return () => router.events.off('routeChangeComplete', handler);
  }, []);

  return (
    // Prevent SSR errors
    <ReactQueryCacheProvider queryCache={cache}>
      <ThemeProvider theme={mounted && darkMode ? darkTheme : defaultTheme}>
        <div
          css={[
            tw`grid h-full box-border`,
            css`
              visibility: ${mounted ? 'visible' : 'hidden'};
              max-height: 100vh;
              grid-template-columns: 80px 1fr;
              grid-template-rows: 70px 1fr;
              grid-template-areas: 'sidebar header' 'sidebar content';
            `,
          ]}
        >
          {/* Menu */}
          <a.div
            ref={ref}
            css={
              ((theme) => css`
                ${tw`absolute flex z-20 bottom-0 top-0 select-none`}
                width: 600px;
                will-change: transform;
                box-shadow: 10px 0px 10px rgba(0, 0, 0, 0.15);
                background: ${theme.colors.bgSidebar};
                color: ${theme.colors.textSidebar};
              `) as ThemedCSS
            }
            style={{ transform: ap.x.interpolate((v) => `translateX(${v}%)`) }}
          >
            <ul
              css={css`
                ${tw`flex flex-col h-full w-full`}
              `}
            >
              <MenuItem
                onClick={() => setMenuActive(!menuActive)}
                css={(theme) => css`
                  ${tw`relative justify-end`}

                  ::before {
                    ${tw`absolute left-0 right-0 bottom-0`}
                    content: '';
                    height: 2px;
                    background: ${theme.colors.bgSidebarActive};
                  }
                `}
              >
                <X></X>
              </MenuItem>
              <MenuItem active={router.pathname === '/'}>
                <Link href="/" as="/">
                  <MenuLink>
                    <PieChart></PieChart> <span>Profile</span>
                  </MenuLink>
                </Link>
              </MenuItem>
              <MenuItem active={router.pathname === '/clients'}>
                <Link href="/clients" as="/clients">
                  <MenuLink>
                    <Users></Users> <span>Clients</span>
                  </MenuLink>
                </Link>
              </MenuItem>
              <MenuItem>
                <Database></Database> <span>Realty</span>
              </MenuItem>
              <MenuItem>
                <Home></Home> <span>Second Market</span>
              </MenuItem>
              <MenuItem>
                <List></List> <span>Tasks</span>
              </MenuItem>
              <MenuItem>
                <Folder></Folder> <span>Documents</span>
              </MenuItem>
              <MenuItem>
                <Volume2></Volume2> <span>Marketing</span>
              </MenuItem>
              <MenuItem>
                <Info></Info> <span>Information</span>
              </MenuItem>
              <MenuItem>
                <Lock></Lock> <span>Security</span>
              </MenuItem>
              <MenuItem
                active={router.pathname === '/settings'}
                css={css`
                  ${tw`justify-between`}
                  margin-top: auto;
                `}
              >
                <Link href="/settings" as="/settings">
                  <MenuLink>
                    <Settings></Settings> <span>Settings</span>
                  </MenuLink>
                </Link>
                <button onClick={() => setDarkMode(!darkMode)}>
                  {mounted && darkMode ? <Sun></Sun> : <Moon></Moon>}
                </button>
              </MenuItem>
            </ul>
          </a.div>

          {/* Header */}
          <header
            css={
              ((theme) => css`
                ${tw`flex shadow z-10`}
                grid-area: header;
                background: ${theme.colors.bgHeader};
                color: ${theme.colors.textHeader};
              `) as ThemedCSS
            }
          >
            <ul
              css={css`
                ${tw`flex flex-1 justify-end`}
              `}
            >
              <HeaderItem
                css={css`
                  ${tw`flex-1 justify-end space-x-4`}
                `}
              >
                <Input
                  placeholder="Search"
                  type="search"
                  css={css`
                    ${tw`block`}
                    flex: 1 10px;
                    width: clamp(100px, 100%, 800px);
                    transition: ${mounted && reduceMotion ? 'none' : 'transform 0.3s, color 0.2s'};
                    transform: ${searchActive ? 'scaleX(1)' : 'scaleX(0)'};
                    transform-origin: bottom right;
                    transition-property: transform, color;
                    ${searchActive ? tw`text-opacity-100` : tw`text-opacity-0`}
                    ${searchActive && 'transition-delay: 0s, 0.3s;'}
                  justify-self: center;

                    ::placeholder {
                      ${searchActive ? tw`text-opacity-100` : tw`text-opacity-0`}
                      transition: ${mounted && reduceMotion ? 'none' : 'color 0.3s'};
                      ${searchActive && 'transition-delay: 0.3s;'}
                    }
                  `}
                />
                <button onClick={() => setSearchActive(!searchActive)}>
                  <Search></Search>
                </button>
              </HeaderItem>
              <HeaderItem>
                <Clock></Clock>{' '}
                <span
                  css={css`
                    ${tw`text-white`}
                  `}
                >
                  {time}
                </span>
              </HeaderItem>
              <HeaderItem
                css={css`
                  align-items: stretch;
                `}
              >
                <Avatar
                  src={URL}
                  width={46}
                  height={46}
                  css={css`
                    align-self: center;
                  `}
                ></Avatar>
                <button
                  css={css`
                    ${tw`flex items-center space-x-2`}
                  `}
                >
                  <span>Salamatin Dmitry</span>
                  <ChevronDown
                    size="18"
                    css={css`
                      margin-top: 1px;
                    `}
                  ></ChevronDown>
                </button>
              </HeaderItem>
              <HeaderItem>
                <Bell></Bell>
              </HeaderItem>
              <HeaderItem>
                <div
                  css={css`
                    ${tw`relative`}
                  `}
                >
                  <Mail></Mail>
                  <Circle
                    width="8"
                    fill="tomato"
                    css={css`
                      ${tw`absolute top-0 right-0`}
                      left: calc(100% - 6px);
                    `}
                  ></Circle>
                </div>
              </HeaderItem>
              <HeaderItem>
                <LogOut></LogOut>
              </HeaderItem>
            </ul>
          </header>

          {/* Sidebar */}
          <aside
            css={
              ((theme) =>
                css`
                  ${tw`z-10`}
                  grid-area: sidebar;
                  background: ${theme.colors.bgSidebar};
                  color: ${theme.colors.textSidebar};
                  transform: translateX(0%);
                  transition: transform 0.3s;
                  will-change: transform;
                `) as ThemedCSS
            }
          >
            <ul
              css={css`
                ${tw`flex flex-col h-full`}
              `}
            >
              <SidebarItem onClick={() => setMenuActive(!menuActive)}>
                <Menu size={28}></Menu>
              </SidebarItem>
              <SidebarItem active={router.pathname === '/'}>
                <Link href="/" as="/">
                  <SidebarLink>
                    <PieChart></PieChart>
                  </SidebarLink>
                </Link>
              </SidebarItem>
              <SidebarItem active={router.pathname === '/clients'}>
                <Link href="/clients" as="/clients">
                  <SidebarLink>
                    <Users></Users>
                  </SidebarLink>
                </Link>
              </SidebarItem>
              <SidebarItem>
                <Database></Database>
              </SidebarItem>
              <SidebarItem>
                <Home></Home>
              </SidebarItem>
              <SidebarItem>
                <List></List>
              </SidebarItem>
              <SidebarItem>
                <Folder></Folder>
              </SidebarItem>
              <SidebarItem>
                <Volume2></Volume2>
              </SidebarItem>
              <SidebarItem>
                <Info></Info>
              </SidebarItem>
              <SidebarItem>
                <Lock></Lock>
              </SidebarItem>
              <SidebarItem
                css={css`
                  ${tw`mt-auto`}
                `}
              >
                <button onClick={() => setDarkMode(!darkMode)}>
                  {mounted && darkMode ? <Sun></Sun> : <Moon></Moon>}
                </button>
              </SidebarItem>
              <SidebarItem active={router.pathname === '/settings'}>
                <Link href="/settings" as="/settings">
                  <SidebarLink>
                    <Settings></Settings>
                  </SidebarLink>
                </Link>
              </SidebarItem>
            </ul>
          </aside>

          {/* Content */}
          <section
            css={
              ((theme) => css`
                ${tw`relative overflow-hidden`}
                grid-area: content;
                background: ${theme.colors.bgContent};
                color: ${theme.colors.textContent};
              `) as ThemedCSS
            }
          >
            {mounted &&
              transitions.map(({ item, key, props }) => (
                <a.div
                  style={{
                    opacity: props.opacity,
                    transform: props.y.interpolate((v) => `translate3d(0, ${v}%, 0)`),
                  }}
                  key={key}
                  css={css`
                    ${tw`absolute top-0 right-0 bottom-0 left-0`}
                    will-change: transform, opacity;
                  `}
                >
                  <item.Component {...item.pageProps}></item.Component>
                </a.div>
              ))}
          </section>
        </div>
      </ThemeProvider>
    </ReactQueryCacheProvider>
  );
};

let SidebarLink = styled.a`
  ${tw`flex items-center justify-center w-full h-full`}
`;

let MenuLink = styled(SidebarLink)`
  ${tw`justify-start space-x-4`}
`;

let Circle: React.FC<any> = (props) => {
  return (
    <svg viewBox="0 0 10 10" {...props}>
      <circle cx="5" cy="5" r="5"></circle>
    </svg>
  );
};

let SidebarItem = styled.li<Themed<{ active?: boolean }>>`
  ${tw`flex items-center justify-center relative`}
  cursor: pointer;
  box-sizing: border-box;
  width: 80px;
  height: 70px;
  transition: background-color 0.3s;
  background: ${({ theme, active }) => active && theme.colors.bgSidebarActive};
  color: ${({ theme, active }) => active && theme.colors.textSidebarActive};

  :hover {
    background: ${({ theme }) => theme.colors.bgSidebarActive};
    color: ${({ theme }) => theme.colors.textSidebarActive};
  }

  ::after {
    ${tw`absolute top-0 left-0 bottom-0`}
    content: '';
    width: 4px;
    background: ${({ theme }) => theme.colors.accent};
    transform: ${({ active }) => (active ? 'none' : 'translateX(-4px)')};
    transition: transform 0.3s;
  }
`;

let MenuItem = styled.li<Themed<{ active?: boolean }>>`
  ${tw`flex px-6 space-x-4 items-center relative cursor-pointer`}
  box-sizing: border-box;
  height: 70px;
  transition: background-color 0.3s;
  padding-left: 324px;
  background: ${({ theme, active }) => active && theme.colors.bgSidebarActive};
  color: ${({ theme, active }) => active && theme.colors.textSidebarActive};

  :hover {
    background: ${({ theme }) => theme.colors.bgSidebarActive};
    color: ${({ theme }) => theme.colors.textSidebarActive};
  }

  ::after {
    ${tw`absolute top-0 bottom-0`}
    content: '';
    left: calc(50% - 80px);
    width: 80px;
    transform: ${({ active }) => (active ? 'none' : 'translateX(-4px)')};
    opacity: ${({ active }) => (active ? '1' : '0')};
    background: ${({ theme }) => theme.colors.accent};
    will-change: transform, opacity;
    transition: transform 0.3s, opacity 0.3s;
  }
`;

let HeaderItem = styled.li<Themed>`
  ${tw`flex items-center justify-center space-x-2 px-4`}

  :hover {
    color: ${({ theme }) => theme.colors.textHeaderActive};
  }
`;

export default App;
