import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { Themed, ThemedCSS } from '@self/lib/types';
import React, { useState } from 'react';
import {
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
  PieChart,
  Search,
  Settings,
  Sliders,
  Users,
  Volume2,
  X,
} from 'react-feather';
import { animated as a, useSpring } from 'react-spring';
import tw from 'twin.macro';

const URL = 'https://picsum.photos/200/200';

let IndexPage: React.FunctionComponent<any> = () => {
  let [active, setActive] = useState(false);
  let [menuActive, setMenuActive] = useState(false);
  let [searchActive, setSearchActive] = useState(false);

  let ap = useSpring({
    x: menuActive ? -49 : -100,
    config: {
      friction: 18,
    },
  });

  return (
    <div
      css={[
        tw`grid h-full`,
        css`
          grid-template-columns: 80px 1fr;
          grid-template-rows: 70px 1fr;
          grid-template-areas: 'sidebar header' 'sidebar content';
        `,
      ]}
    >
      {/* Menu */}
      <a.div
        css={
          ((theme) => css`
            ${tw`absolute flex z-10 bottom-0 top-0 select-none`}
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
          css={[
            tw`flex flex-col h-full w-full`,
            css`
              & ${SidebarItem}:hover {
                ${tw`text-white cursor-pointer bg-indigo-700`}
              }
            `,
          ]}
        >
          <MenuItem
            onClick={() => setMenuActive(!menuActive)}
            css={css`
              ${tw`relative justify-end`}

              ::before {
                ${tw`absolute left-0 right-0 bottom-0 bg-indigo-400 bg-opacity-25`}
                content: '';
                height: 2px;
              }
            `}
          >
            <X></X>
          </MenuItem>
          <MenuItem>
            <PieChart></PieChart> <span>Profile</span>
          </MenuItem>
          <MenuItem active={active} onClick={() => setActive(!active)}>
            <Users></Users> <span>Clients</span>
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
            css={[
              css`
                margin-top: auto;
              `,
            ]}
          >
            <Settings></Settings> <span>Settings</span>
          </MenuItem>
        </ul>
      </a.div>

      {/* Header */}
      <header
        css={
          ((theme) => css`
            ${tw`shadow`}
            grid-area: header;
            background: ${theme.colors.bgHeader};
            color: ${theme.colors.textHeader};
          `) as ThemedCSS
        }
      >
        <ul
          css={css`
            ${tw`flex h-full items-center justify-end space-x-2`}
          `}
        >
          <HeaderItem
            css={css`
              ${tw`flex-1 justify-end`}
            `}
          >
            <input
              placeholder="Search"
              type="search"
              css={css`
                ${tw`block w-full p-2 rounded text-black`}
                transition: transform 0.3s, color 0.2s;
                transform: ${searchActive ? 'scaleX(1)' : 'scaleX(0)'};
                transform-origin: bottom right;
                transition-property: transform, color;
                ${searchActive ? tw`text-opacity-100` : tw`text-opacity-0`}
                ${searchActive && 'transition-delay: 0s, 0.3s;'}

                ::placeholder {
                  ${tw`text-gray-500`}
                  ${searchActive ? tw`text-opacity-100` : tw`text-opacity-0`}
                  transition: color 0.3s;
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
              08:00
            </span>
          </HeaderItem>
          <HeaderItem>
            <Avatar src={URL} width={46} height={46}></Avatar>
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
            <button>
              <Sliders></Sliders>
            </button>
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
              grid-area: sidebar;
              background: ${theme.colors.bgSidebar};
              color: ${theme.colors.textSidebar};
            `) as ThemedCSS
        }
      >
        <ul
          css={css`
            ${tw`flex flex-col h-full`}
          `}
        >
          <SidebarItem onClick={() => setMenuActive(!menuActive)}>
            <Menu></Menu>
          </SidebarItem>
          <SidebarItem>
            <PieChart></PieChart>
          </SidebarItem>
          <SidebarItem active={active} onClick={() => setActive(!active)}>
            <Users></Users>
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
            css={[
              css`
                margin-top: auto;
              `,
            ]}
          >
            <Settings></Settings>
          </SidebarItem>
        </ul>
      </aside>

      {/* Content */}
      <section
        css={
          ((theme) => css`
            ${tw`p-4`}
            grid-area: content;
            background: ${theme.colors.bgContent};
          `) as ThemedCSS
        }
      >
        <h1>content</h1>
      </section>
    </div>
  );
};

let Circle: React.FC<any> = (props) => {
  return (
    <svg viewBox="0 0 10 10" {...props}>
      <circle cx="5" cy="5" r="5"></circle>
    </svg>
  );
};

let Avatar: React.FC<any> = (props) => {
  let { src, ...rest } = props;

  return (
    <svg viewBox="0 0 100 100" {...rest}>
      <mask id="mask">
        <circle cx="50" cy="50" r="50" fill="white"></circle>
      </mask>
      <image href={src} width="100" height="100" mask="url(#mask)" />
      <circle cx="50" cy="50" r="49" stroke="#fff" fill="none" strokeWidth="2"></circle>
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
    ${tw`absolute top-0 left-0 bottom-0 bg-crimson`}
    content: '';
    width: 4px;
    transform: ${(props) => (props.active ? 'none' : 'translateX(-4px)')};
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
    ${tw`absolute top-0 bottom-0 bg-crimson`}
    content: '';
    left: calc(50% - 80px);
    width: 80px;
    transform: ${({ active }) => (active ? 'none' : 'translateX(-4px)')};
    opacity: ${({ active }) => (active ? '1' : '0')};
    will-change: transform, opacity;
    transition: transform 0.3s, opacity 0.3s;
  }
`;

let HeaderItem = styled.li<Themed>`
  ${tw`flex px-4 items-center justify-center space-x-2`}

  :hover {
    color: ${({ theme }) => theme.colors.textHeaderActive};
  }
`;

export default IndexPage;
