import { css } from '@emotion/core';
import { Checkbox } from '@self/components/Checkbox';
import React from 'react';
import tw from 'twin.macro';
import shallow from 'zustand/shallow';
import { useSettingsStore } from './_app';

let SettingsPage: React.FC = () => {
  let settings = useSettingsStore((settings) => settings, shallow);

  return (
    <div
      css={css`
        ${tw`p-4 space-y-2`}
      `}
    >
      <div
        css={css`
          ${tw`space-x-2`}
        `}
      >
        <Checkbox
          animate={!settings.reduceMotion}
          checked={settings.darkMode}
          onClick={() => settings.setDarkMode(!settings.darkMode)}
        ></Checkbox>
        <label htmlFor="#">Dark Mode</label>
      </div>
      <div
        css={css`
          ${tw`space-x-2`}
        `}
      >
        <Checkbox
          animate={!settings.reduceMotion}
          checked={settings.reduceMotion}
          onClick={() => settings.setReduceMotion(!settings.reduceMotion)}
        ></Checkbox>
        <label htmlFor="#">Reduce Motion</label>
      </div>
    </div>
  );
};

export default SettingsPage;
