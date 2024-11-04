import { CityInfo } from '../types';

const UNSPLASH_BASE_URL = 'https://images.unsplash.com/photo-';

async function fetchCityInfo(cityName: string): Promise<CityInfo> {
  // 模拟API调用，实际项目中这里应该调用真实的API
  await new Promise(resolve => setTimeout(resolve, 500));

  // 为不同城市返回不同的默认信息
  const cityData: Record<string, CityInfo> = {
    'Beijing': {
      name: '北京',
      country: '中国',
      population: 21540000,
      description: '中国首都，拥有悠久的历史文化和现代化的都市风貌。',
      attractions: {
        cultural: [
          {
            name: '故宫',
            description: '中国明清两代的皇家宫殿，世界上现存最大的古代宫殿建筑群。',
            imageUrl: `${UNSPLASH_BASE_URL}1508950914687-2f4fe9562ca2?auto=format&fit=crop&w=800&q=80`
          },
          {
            name: '长城',
            description: '世界七大奇迹之一，见证了中国古代的建筑智慧。',
            imageUrl: `${UNSPLASH_BASE_URL}1508804185872-d7fc8b933d1a?auto=format&fit=crop&w=800&q=80`
          }
        ],
        natural: [
          {
            name: '香山公园',
            description: '北京著名的赏红叶胜地，景色优美。',
            imageUrl: `${UNSPLASH_BASE_URL}1445262102533-29fdb422cba0?auto=format&fit=crop&w=800&q=80`
          }
        ]
      },
      bestTimeToVisit: '秋季（9-10月）天气凉爽，是观光的最佳季节。',
      localCuisine: [
        {
          name: '北京烤鸭',
          description: '北京最著名的传统美食，皮酥肉嫩。'
        },
        {
          name: '炸酱面',
          description: '北京特色面食，咸香可口。'
        }
      ]
    },
    'Shanghai': {
      name: '上海',
      country: '中国',
      population: 24870895,
      description: '中国最大的经济中心，国际化大都市。',
      attractions: {
        cultural: [
          {
            name: '外滩',
            description: '上海地标，汇集了各种风格的历史建筑。',
            imageUrl: `${UNSPLASH_BASE_URL}1474181487882-5abf3f0ba6c2?auto=format&fit=crop&w=800&q=80`
          }
        ],
        natural: [
          {
            name: '世纪公园',
            description: '上海最大的生态公园之一。',
            imageUrl: `${UNSPLASH_BASE_URL}1545158535-c3f3f6046b8a?auto=format&fit=crop&w=800&q=80`
          }
        ]
      },
      bestTimeToVisit: '春季（3-5月）和秋季（9-11月）气候宜人。',
      localCuisine: [
        {
          name: '小笼包',
          description: '上海特色小吃，皮薄馅多汤汁足。'
        }
      ]
    }
  };

  // 如果城市不在预设数据中，生成通用信息
  if (!cityData[cityName]) {
    return {
      name: cityName,
      country: '获取中...',
      population: 0,
      description: '正在获取城市信息...',
      attractions: {
        cultural: [
          {
            name: '正在加载景点信息...',
            description: '加载中...',
            imageUrl: `${UNSPLASH_BASE_URL}1516834611397-8d633f0053df?auto=format&fit=crop&w=800&q=80`
          }
        ],
        natural: [
          {
            name: '正在加载自然景观信息...',
            description: '加载中...',
            imageUrl: `${UNSPLASH_BASE_URL}1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80`
          }
        ]
      },
      bestTimeToVisit: '正在获取最佳旅游时间信息...',
      localCuisine: [
        {
          name: '正在加载美食信息...',
          description: '加载中...'
        }
      ]
    };
  }

  return cityData[cityName];
}

export { fetchCityInfo };