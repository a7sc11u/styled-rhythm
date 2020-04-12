import { Theme } from '@styled-rhythm/types';

import { is, get } from '@styled-rhythm/utils';
import { measure, measureMin, measureMax } from '@styled-rhythm/core';

import replace from './lib/replace-rule';

export const measurePlugin = (css: any, theme: Theme, result: any) => {
	//
	const getValue = value => {
		const scaleValue = get(theme.measure, value, value);

		const styleValue = is.num(scaleValue) ? `${scaleValue}ch` : scaleValue;

		return styleValue;
	};

	css.walkDecls(decl => {
		const { prop, value } = decl;

		if (prop === 'measure') {
			replace(decl, measure({ space: getValue(value) }));
		}

		if (prop === 'measure-min') {
			replace(decl, measureMin({ space: getValue(value) }));
		}

		if (prop === 'measure-max') {
			replace(decl, measureMax({ space: getValue(value) }));
		}
	});
};

export default measurePlugin;
