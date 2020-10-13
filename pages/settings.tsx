import { css } from '@emotion/core';
import { Checkbox } from '@self/components/Checkbox';
import { useSettingsStore } from '@self/lib/hooks/useSettingsStore';
import React, { useState } from 'react';
import tw from 'twin.macro';
import shallow from 'zustand/shallow';

let SettingsPage: React.FC = () => {
  let settings = useSettingsStore((settings) => settings, shallow);
  let [active, setActive] = useState(false);

  return (
    <div
      css={css`
        ${tw`p-4 space-y-2 select-none`}
      `}
    >
      <div
        css={css`
          ${tw`space-x-2`}
        `}
      >
        <Checkbox
          id="dark-mode"
          animate={!settings.reduceMotion}
          checked={settings.darkMode}
          onChange={() => settings.setDarkMode(!settings.darkMode)}
        ></Checkbox>
        <label htmlFor="dark-mode">Dark Mode</label>
      </div>
      <div
        css={css`
          ${tw`space-x-2`}
        `}
      >
        <Checkbox
          id="reduce-motion"
          animate={!settings.reduceMotion}
          checked={settings.reduceMotion}
          onChange={() => settings.setReduceMotion(!settings.reduceMotion)}
        ></Checkbox>
        <label htmlFor="reduce-motion">Reduce Motion</label>
      </div>
      <div
        css={css`
          ${tw`space-x-2`}
        `}
      >
        <Checkbox
          id="testing"
          animate={!settings.reduceMotion}
          checked={active}
          onChange={() => setActive(!active)}
        ></Checkbox>
        <label htmlFor="testing">Just for Testing</label>
      </div>
    </div>
  );
};

export default SettingsPage;
