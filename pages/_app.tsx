import { css, Global } from '@emotion/core';
import styled from '@emotion/styled';
import { Avatar } from '@self/components/Avatar';
import { Dropdown } from '@self/components/Dropdown';
import { Input } from '@self/components/Input';
import { useCurrentTime } from '@self/lib/hooks/useCurrentTime';
import { useMounted } from '@self/lib/hooks/useMounted';
import { useOutsideClick } from '@self/lib/hooks/useOutsideClick';
import { useSettingsStore } from '@self/lib/hooks/useSettingsStore';
import { darkTheme, defaultTheme } from '@self/lib/styles/theme';
import { Themed, ThemedCSS } from '@self/lib/types';
import { ThemeProvider } from 'emotion-theming';
import { AppType } from 'next/dist/next-server/lib/utils';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import {
  Bell,
  BellOff,
  ChevronDown,
  ChevronUp,
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
  MessageSquare,
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
import { Hydrate } from 'react-query/hydration';
import { useMediaQuery } from 'react-responsive';
import { animated as a, useSpring } from 'react-spring';
import tw from 'twin.macro';
import shallow from 'zustand/shallow';
import '../styles/index.css';

const URL = 'https://picsum.photos/200/200';

const queryCache = new QueryCache();

let App: AppType = (props) => {
  let { Component, pageProps, router } = props;
  let mounted = useMounted();
  let [menuActive, setMenuActive] = useState(false);
  let [showDropdown, setShowDropdown] = useState(false);
  let [searchActive, setSearchActive] = useState(false);
  let { darkMode, setDarkMode, reduceMotion } = useSettingsStore(
    ({ darkMode, setDarkMode, reduceMotion }) => ({ darkMode, setDarkMode, reduceMotion }),
    shallow,
  );
  let ref = useOutsideClick(() => {
    setMenuActive(false);
  });
  let time = useCurrentTime();
  let tabletSize = useMediaQuery({ minWidth: 768 });
  let buttonRef = useRef();

  let ap = useSpring({
    x: menuActive ? 0 : -100,
    immediate: reduceMotion,
    config: {
      friction: tabletSize ? 18 : 24,
    },
  });

  useEffect(() => {
    if (mounted) {
      setTimeout(() => {
        document.body.classList.add('mounted');
      }, 50);
    }
  }, [mounted]);

  useEffect(() => {
    function handler(url: string) {
      setMenuActive(false);
    }

    router.events.on('routeChangeComplete', handler);
    return () => router.events.off('routeChangeComplete', handler);
  }, [router]);

  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <Hydrate state={pageProps.dehydratedState}>
        {/* Prevent SSR errors */}
        <ThemeProvider theme={mounted && darkMode ? darkTheme : defaultTheme}>
          <div
            css={[
              tw`grid box-border`,
              css`
                visibility: ${mounted ? 'visible' : 'hidden'};
                min-height: 100%;
                grid-template-columns: 80px 1fr;
                grid-template-rows: 70px 1fr;
                grid-auto-rows: 100px;

                @media (min-width: 768px) {
                  ${tw`h-full`}
                }
              `,
            ]}
          >
            <Global
              styles={
                ((theme) => css`
                  ::selection {
                    background: ${theme.colors.bgSelection};
                  }

                  body {
                    background: ${theme.colors.bgSidebar};
                  }

                  ${menuActive &&
                  css`
                    @media (max-width: 768px) {
                      html,
                      body {
                        overflow: hidden !important;
                      }
                    }
                  `}
                `) as ThemedCSS
              }
            />

            <div
              css={css`
                ${tw`absolute`}
              `}
            >
              <svg viewBox="0 0 100 100">
                <mask id="avatar-mask">
                  <circle cx="50" cy="50" r="48" fill="white"></circle>
                </mask>
              </svg>
            </div>

            <div
              css={(theme) => css`
                ${tw`z-30`}
                grid-column: 1;
                grid-row: 1;
                background: ${theme.colors.bgSidebar};
                color: ${theme.colors.textSidebar};

                @media (min-width: 768px) {
                  ${tw`fixed`}
                }

                @media (min-width: 1024px) {
                  ${tw`hidden`}
                }
              `}
            >
              <SidebarItem onClick={() => setMenuActive(!menuActive)}>
                <Menu size={28}></Menu>
              </SidebarItem>
            </div>

            {/* Menu */}
            <a.div
              ref={ref}
              css={
                ((theme) => css`
                  ${tw`fixed flex z-30 top-0 bottom-0 right-0 left-0 select-none`}
                  box-shadow: 10px 0px 10px rgba(0, 0, 0, 0.15);
                  background: ${theme.colors.bgSidebar};
                  color: ${theme.colors.textSidebar};
                  will-change: transform;

                  @media (min-width: 768px) {
                    width: 500px;
                    left: -100px;
                  }
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
                  css={(theme) => css`
                    ${tw`relative items-stretch`}
                    min-height: 70px;

                    ::before {
                      ${tw`absolute left-0 right-0 bottom-0`}
                      content: '';
                      height: 2px;
                      background: ${theme.colors.bgSidebarActive};
                    }

                    @media (min-width: 768px) {
                      ${tw`space-x-0`}
                    }
                  `}
                >
                  <Avatar
                    src={URL}
                    css={css`
                      width: 40px;

                      @media (min-width: 768px) {
                        ${tw`hidden`}
                      }
                    `}
                  ></Avatar>
                  <button
                    onClick={() => setMenuActive(!menuActive)}
                    css={css`
                      ${tw`flex flex-1 justify-end items-center`}
                    `}
                  >
                    <X></X>
                  </button>
                </MenuItem>
                <MenuItem active={router.pathname === '/'}>
                  <Link href="/">
                    <MenuLink>
                      <PieChart></PieChart> <span>Profile</span>
                    </MenuLink>
                  </Link>
                </MenuItem>
                <MenuItem active={router.pathname === '/clients'}>
                  <Link href="/clients">
                    <MenuLink>
                      <Users></Users> <span>Clients</span>
                    </MenuLink>
                  </Link>
                </MenuItem>
                <MenuItem active={router.pathname === '/database'}>
                  <Link href="/database">
                    <MenuLink>
                      <Database></Database> <span>Realty</span>
                    </MenuLink>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Home></Home> <span>Second Market</span>
                </MenuItem>
                <MenuItem active={router.pathname === '/tasks'}>
                  <Link href="/tasks">
                    <MenuLink>
                      <List></List> <span>Tasks</span>
                    </MenuLink>
                  </Link>
                </MenuItem>
                <MenuItem active={router.pathname === '/documents'}>
                  <Link href="/documents">
                    <MenuLink>
                      <Folder></Folder> <span>Documents</span>
                    </MenuLink>
                  </Link>
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
                  <Link href="/settings">
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
                  ${tw`flex z-20 px-2`}
                  height: 70px;
                  grid-column: 2/3;
                  grid-row: 1;
                  background: ${theme.colors.bgHeader};
                  color: ${theme.colors.textHeader};

                  @media (min-width: 768px) {
                    ${tw`fixed px-0 right-0`}
                    left: 70px;
                  }
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
                    ${tw`flex-1 justify-end space-x-2`}
                  `}
                >
                  <Input
                    placeholder="Search"
                    type="search"
                    css={css`
                      ${tw`block my-2`}
                      align-self: center;
                      flex: 1 10px;
                      width: clamp(100px, 100%, 800px);
                      transition: ${mounted && reduceMotion
                        ? 'none'
                        : 'transform 0.3s, color 0.2s'};
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
                  <button
                    onClick={() => setSearchActive(!searchActive)}
                    css={css`
                      ${tw`p-2`}
                    `}
                  >
                    <Search></Search>
                  </button>
                </HeaderItem>
                <HeaderItem
                  css={css`
                    ${tw`hidden`}

                    @media (min-width: 1024px) {
                      ${tw`flex self-center`}
                    }
                  `}
                >
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
                    ${tw`hidden`}
                    align-items: stretch;

                    @media (min-width: 768px) {
                      ${tw`flex`}
                    }
                  `}
                >
                  <Avatar
                    src={URL}
                    css={css`
                      align-self: center;
                      width: 46px;
                    `}
                  ></Avatar>
                  <button
                    ref={buttonRef}
                    css={css`
                      ${tw`flex items-center space-x-2`}
                    `}
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    <span>Salamatin Dmitry</span>
                    {showDropdown ? (
                      <ChevronUp
                        size={18}
                        css={css`
                          margin-top: 1px;
                        `}
                      ></ChevronUp>
                    ) : (
                      <ChevronDown
                        size="18"
                        css={css`
                          margin-top: 1px;
                        `}
                      ></ChevronDown>
                    )}
                  </button>
                  <Dropdown
                    fixed
                    animate={!reduceMotion}
                    anchorElement={buttonRef.current}
                    open={showDropdown}
                    onClose={() => setShowDropdown((s) => !s)}
                  >
                    <ul
                      css={(theme) => css`
                        ${tw`flex flex-col`}
                        color: ${theme.colors.textItem};

                        > * {
                          > button {
                            ${tw`flex w-full p-4 text-left items-center`}

                            > * {
                              ${tw`mr-2`}
                              color: ${theme.colors.textItemTitle};
                            }

                            &:hover {
                              background: ${theme.colors.bgDropdownActive};
                            }
                          }
                        }
                      `}
                    >
                      <li>
                        <button>
                          <Settings size={18}></Settings>
                          Manage
                        </button>
                      </li>
                      <li>
                        <button>
                          <BellOff size={18}></BellOff>
                          Do not Disturb
                        </button>
                      </li>
                      <li>
                        <button>
                          <MessageSquare size={18}></MessageSquare>
                          Messages
                        </button>
                      </li>
                      <li>
                        <button>
                          <LogOut size={18}></LogOut>
                          Log Out
                        </button>
                      </li>
                    </ul>
                  </Dropdown>
                </HeaderItem>
                <HeaderItem
                  css={css`
                    ${tw`hidden`}

                    @media (min-width: 1024px) {
                      ${tw`flex self-center`}
                    }
                  `}
                >
                  <Bell></Bell>
                </HeaderItem>
                <HeaderItem
                  css={css`
                    ${tw`hidden`}

                    @media (min-width: 1024px) {
                      ${tw`flex self-center`}
                    }
                  `}
                >
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
                <HeaderItem
                  css={css`
                    ${tw`hidden`}

                    @media (min-width: 768px) {
                      ${tw`flex`}
                      align-self: center;
                    }
                  `}
                >
                  <LogOut></LogOut>
                </HeaderItem>
              </ul>
            </header>

            {/* Sidebar */}
            <aside
              css={
                ((theme) =>
                  css`
                    ${tw`fixed bottom-0 top-0 z-20 hidden`}
                    grid-column: 1;
                    grid-row: 1/3;
                    background: ${theme.colors.bgSidebar};
                    color: ${theme.colors.textSidebar};
                    transform: translateX(0%);
                    transition: transform 0.3s;
                    will-change: transform;

                    @media (min-width: 1024px) {
                      ${tw`flex`}
                    }
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
                  <Link href="/">
                    <SidebarLink>
                      <PieChart></PieChart>
                    </SidebarLink>
                  </Link>
                </SidebarItem>
                <SidebarItem active={router.pathname === '/clients'}>
                  <Link href="/clients">
                    <SidebarLink>
                      <Users></Users>
                    </SidebarLink>
                  </Link>
                </SidebarItem>
                <SidebarItem active={router.pathname === '/database'}>
                  <Link href="/database">
                    <SidebarLink>
                      <Database></Database>
                    </SidebarLink>
                  </Link>
                </SidebarItem>
                <SidebarItem>
                  <Home></Home>
                </SidebarItem>
                <SidebarItem active={router.pathname === '/tasks'}>
                  <Link href="/tasks">
                    <SidebarLink>
                      <List></List>
                    </SidebarLink>
                  </Link>
                </SidebarItem>
                <SidebarItem active={router.pathname === '/documents'}>
                  <Link href="/documents">
                    <SidebarLink>
                      <Folder></Folder>
                    </SidebarLink>
                  </Link>
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
                  <Link href="/settings">
                    <SidebarLink>
                      <Settings></Settings>
                    </SidebarLink>
                  </Link>
                </SidebarItem>
              </ul>
            </aside>

            <div
              css={(theme) => css`
                ${tw`z-0`}
                background: ${theme.colors.bgContent};
                grid-column: 1/3;
                grid-row: 2/3;
              `}
            ></div>

            {/* Content */}
            {mounted && (
              <section
                id="container"
                css={(theme) => css`
                  ${tw`z-10`}
                  color: ${theme.colors.textContent};
                  grid-column: 1/3;
                  grid-row: 2/3;
                  will-change: transform, opacity;

                  @media (min-width: 1024px) {
                    grid-column: 2/3;
                  }
                `}
              >
                <Component {...pageProps}></Component>
              </section>
            )}
          </div>
        </ThemeProvider>
      </Hydrate>
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
    background: ${({ theme }) => theme.gradients.vertical.accent};
    transform: ${({ active }) => (active ? 'none' : 'translateX(-4px)')};
    transition: transform 0.3s;
  }
`;

let MenuItem = styled.li<Themed<{ active?: boolean }>>`
  ${tw`flex px-6 space-x-4 items-center relative cursor-pointer`}
  max-height: 70px;
  flex: 1;
  transition: background-color 0.3s;
  background: ${({ theme, active }) => active && theme.colors.bgSidebarActive};
  color: ${({ theme, active }) => active && theme.colors.textSidebarActive};

  :hover {
    background: ${({ theme }) => theme.colors.bgSidebarActive};
    color: ${({ theme }) => theme.colors.textSidebarActive};
  }

  ::after {
    ${tw`absolute top-0 bottom-0`}
    content: '';
    left: 0;
    width: 4px;
    transform: ${({ active }) => (active ? 'none' : 'translateX(-4px)')};
    opacity: ${({ active }) => (active ? '1' : '0')};
    background: ${({ theme }) => theme.gradients.vertical.accent};
    transition: transform 0.3s, opacity 0.3s;

    @media (min-width: 768px) {
      width: 104px;
    }
  }

  @media (min-width: 768px) {
    padding-left: 128px;
  }
`;

let HeaderItem = styled.li<Themed>`
  ${tw`flex justify-center space-x-2`}

  :hover {
    color: ${({ theme }) => theme.colors.textHeaderActive};
  }

  @media (min-width: 768px) {
    ${tw`px-4`}
  }
`;

export default App;
