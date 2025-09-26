import {
  Infographic,
  loadSVGResource,
  registerResourceLoader,
} from '@antv/infographic';
import { getAsset } from './get-asset';

registerResourceLoader(async (config) => {
  const { data } = config;
  const str = await getAsset('icon', data);
  return loadSVGResource(str);
});

export interface RenderOptions {
  structure?: string;
  item?: string;
  background?: string;
}

export function render({
  structure = 'list-column',
  item = 'pyramid',
  background,
}: RenderOptions) {
  const container = document.getElementById('root');

  const infographic = new Infographic({
    container,
    width: 800,
    height: 600,
    padding: 20,
    design: {
      structure: {
        type: structure,
        spacing: -20,
        decoration: 'dot-line',
        // decoration: 'split-line',
        // surround: false,
        // flipRoot: true,
        flipLeaf: true,
        gap: 0,
      },
      title: 'default',
      // item: { type: item, valueFormatter: (v) => `${v}%` },
      items: [
        // { type: 'circle-node', width: 200 },
        // { type: 'pill-badge', width: 200 },
        { type: item, valueFormatter: (v) => `${v}%`, positionH: 'center' },
      ],
    },
    data: {
      title: 'AntV 信息图',
      desc: 'AI 驱动的信息图可视化生成工具',
      items: [
        {
          label: '架构升级',
          desc: '品牌营销策略就是以品牌输出为核心的策略',
          icon: '10-036_v1_lineal',
          children: [
            {
              label: '架构升级',
              desc: '品牌营销策略就是以品牌输出为核心的营销策略',
            },
            {
              label: '架构升级',
              desc: '品牌营销策略就是以品牌输出为核心的营销策略',
            },
            {
              label: '架构升级',
              desc: '品牌营销策略就是以品牌输出为核心的营销策略',
            },
          ],
        },
        {
          label: '架构升级',
          desc: '品牌营销策略就是以品牌输出为核心的策略',
          icon: '10-036_v1_lineal',
          children: [
            {
              label: '架构升级',
              desc: '品牌营销策略就是以品牌输出为核心的营销策略',
            },
            {
              label: '架构升级',
              desc: '品牌营销策略就是以品牌输出为核心的营销策略',
            },
            {
              label: '架构升级',
              desc: '品牌营销策略就是以品牌输出为核心的营销策略',
            },
            // {
            //   label: '架构升级',
            //   desc: '品牌营销策略就是以品牌输出为核心的营销策略',
            // },
          ],
        },
        // {
        //   icon: '10-036_v1_lineal',
        //   label: 'AntV G6',
        //   desc: '简单、易用、完备的图可视化引擎',
        //   value: 80,
        // },
        // {
        //   icon: '10-036_v1_lineal',
        //   label: 'AntV L7',
        //   desc: '专业的地理空间数据可视化引擎',
        //   // value: 2,
        // },
        // {
        //   icon: '10-036_v1_lineal',
        //   label: 'AntV X6',
        //   desc: '基于HTML 和SVG 的图编辑引擎',
        //   value: 3,
        // },
        // {
        //   icon: '0-001_v1_lineal',
        //   label: 'AntV F2',
        //   desc: '专注于移动端的轻量级图表库',
        //   value: 4,
        // },
      ],
    },
    themeConfig: {
      colorBg: background,
      colorPrimary: '#658ff7',
      palette: [
        // '#6699FF',
        '#1783FF',
        '#00C9C9',
        '#F0884D',
        '#D580FF',
        '#7863FF',
        '#60C42D',
        '#BD8F24',
        '#FF80CA',
        '#2491B3',
        '#17C76F',
        '#70CAF8',
      ],
    },
  });

  infographic.render();
}
