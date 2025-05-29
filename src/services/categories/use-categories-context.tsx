import type { ReactNode } from 'react';
import { createContext } from 'react';
import type { components } from '../maverick/generated/maverick-schema';

const CategoriesContext = createContext<components['schemas']['Category'][]>([]);

export const CategoriesProvider = ({ children }: { children: ReactNode }) => {
  return <CategoriesContext value={categories}>{children}</CategoriesContext>;
};

export const useCategoriesContext = () => {
  return categories;
};

const categories: components['schemas']['Category'][] = [
  {
    id: 136,
    name: 'Comedy',
    eventType: 'COMEDY',
    slug: 'comedy',
    heroImagePath: 'https://static.gotickets.com/9cb174ec-be6c-4124-bb2d-bb4476167e1f.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/b934b0a5-45f3-4a3f-b009-5ab7612c9684.webp',
  },
  {
    id: 6,
    name: 'Concert',
    eventType: 'CONCERTS',
    slug: 'concerts',
    heroImagePath: 'https://static.gotickets.com/08667a95-a648-42ce-816d-807e2ab1c197.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/4e361ef5-749c-4be1-8912-6f2489f6866d.webp',
  },
  {
    id: 250,
    name: 'Parking',
    eventType: 'PARKING',
    slug: 'parking',
    heroImagePath: 'https://static.gotickets.com/5ec0df3d-260d-465e-ace3-f6635a9e42c0.webp',
  },
  {
    id: 5,
    name: 'Sports',
    eventType: 'SPORTS',
    slug: 'sports',
    heroImagePath: 'https://static.gotickets.com/3649d5b3-2201-4c24-9b67-a1e0a8868d2d.webp',
    cardImagePath: '',
    performerHeroImagePath:
      'https://static.gotickets.com/01a7a1b5-2712-46b7-9ed6-6390d24ba01f.webp',
    performerCardImagePath: '',
  },
  {
    id: 7,
    name: 'Theater',
    eventType: 'THEATER',
    slug: 'theater',
    heroImagePath: 'https://static.gotickets.com/7bb727a6-b751-4ee0-8f9b-aab2b130b969.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/0a9ad7ef-322b-4c55-a402-d0be34b98ed8.webp',
  },
  {
    id: 139,
    name: 'Adult Contemporary',
    parentId: 6,
    eventType: 'CONCERTS',
    slug: 'adult-contemporary',
    heroImagePath: 'https://static.gotickets.com/cbbc2149-0a60-4aa0-8169-acbfcdb4ce1b.jpg',
    performerHeroImagePath:
      'https://static.gotickets.com/220c11fe-3ad4-455f-a7a4-e6d2087441e1.webp',
  },
  {
    id: 147,
    name: 'Alternative',
    parentId: 6,
    eventType: 'CONCERTS',
    slug: 'alternative',
    heroImagePath: 'https://static.gotickets.com/47680858-86aa-4945-b4c2-2a980b728a43.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/c736620c-f77d-414b-a5b8-e9e84455b7eb.webp',
  },
  {
    id: 189,
    name: 'Amateur Wrestling',
    parentId: 166,
    eventType: 'SPORTS',
    slug: 'amateur-wrestling',
    heroImagePath: 'https://static.gotickets.com/de993def-2236-47c4-92da-2cb1a90354d5.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/b3d43150-3108-4718-8e42-43548301013e.webp',
  },
  {
    id: 203,
    name: 'Arena Football',
    parentId: 5,
    eventType: 'SPORTS',
    slug: 'arena-football',
    heroImagePath: 'https://static.gotickets.com/5a9be4b1-8c28-464f-9c00-847a51c138a5.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/9e78f655-c0e7-470c-98bd-54bf33595664.webp',
  },
  {
    id: 164,
    name: 'Arts and Theater',
    parentId: 7,
    eventType: 'THEATER',
    slug: 'arts-and-theater',
    heroImagePath: 'https://static.gotickets.com/60ff796f-29e5-496c-aed6-9325d232578f.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/babac4e9-dd03-4c58-b7b1-6e5d36f71689.webp',
  },
  {
    id: 168,
    name: 'Auto Racing',
    parentId: 5,
    eventType: 'SPORTS',
    slug: 'auto-racing',
    heroImagePath: 'https://static.gotickets.com/c827014f-fe1d-4d81-8572-e93aa94d4f99.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/4e91a823-6f54-464d-8f5f-4e52e488acc4.webp',
  },
  {
    id: 241,
    name: 'Award Shows',
    parentId: 6,
    eventType: 'CONCERTS',
    slug: 'award-shows',
    heroImagePath: 'https://static.gotickets.com/08600b17-2957-4f06-bee2-76bddbbe95b5.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/8ec4889a-b39b-4ff3-a7d8-1042624288e4.webp',
  },
  {
    id: 146,
    name: 'Ballet and Dance',
    parentId: 7,
    eventType: 'THEATER',
    slug: 'ballet-and-dance',
    heroImagePath: 'https://static.gotickets.com/0e41ed00-09c1-49fa-a8cf-15b54ba48fc2.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/bb2e8ad2-640e-4d85-82f2-d5d20b5d572d.webp',
  },
  {
    id: 188,
    name: 'Baseball',
    parentId: 5,
    eventType: 'SPORTS',
    slug: 'baseball',
    heroImagePath: 'https://static.gotickets.com/b32c6aa1-d676-41be-9fdb-060d25894cb8.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/cde3c64c-0fd7-499a-9ab5-3f03a20930a9.webp',
  },
  {
    id: 177,
    name: 'Basketball',
    parentId: 5,
    eventType: 'SPORTS',
    slug: 'basketball',
    heroImagePath: 'https://static.gotickets.com/288a95eb-b252-478f-baa1-2017da3aabc2.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/63b214c2-ccd0-44ce-a9a2-4223c51afb44.webp',
  },
  {
    id: 153,
    name: 'Blues and Jazz',
    parentId: 6,
    eventType: 'CONCERTS',
    slug: 'blues-and-jazz',
    heroImagePath: 'https://static.gotickets.com/6d0d9467-47c7-4f48-be6a-6000d0c28558.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/64ad003c-d7c0-4620-8927-752a0847e30c.webp',
  },
  {
    id: 220,
    name: 'Boxing',
    parentId: 159,
    eventType: 'SPORTS',
    slug: 'boxing',
    heroImagePath: 'https://static.gotickets.com/f34464da-66f0-4b1f-bbfe-6c2e6749c9cf.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/51ff4752-72eb-48c8-a72a-67246e9d5f6e.webp',
  },
  {
    id: 184,
    name: 'Broadway',
    parentId: 7,
    eventType: 'THEATER',
    slug: 'broadway',
    heroImagePath: 'https://static.gotickets.com/afcfd4ce-217e-4299-af1b-3802fc5739fd.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/dffdd8f2-0872-48f3-ab45-9166c0c82696.webp',
  },
  {
    id: 245,
    name: 'Canadian Basketball',
    parentId: 177,
    eventType: 'SPORTS',
    slug: 'canadian-basketball',
    heroImagePath: 'https://static.gotickets.com/604b9454-8ae1-4340-8ae7-c468fa225d3b.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/60769e00-4b9f-411b-a4c0-01ea335906d0.webp',
  },
  {
    id: 238,
    name: 'Celtic',
    parentId: 6,
    eventType: 'CONCERTS',
    slug: 'celtic',
    heroImagePath: 'https://static.gotickets.com/d2c6e61f-b870-43ee-a5d2-87f688cd6ad7.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/bf9844fa-a6bb-4fae-9441-2b3c326a338a.webp',
  },
  {
    id: 235,
    name: 'Christian',
    parentId: 6,
    eventType: 'CONCERTS',
    slug: 'christian',
    heroImagePath: 'https://static.gotickets.com/0ad9bc26-c86a-400f-a45d-537fa788bd62.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/0ccccab5-e345-4b03-a3f6-141caaeb04f4.webp',
  },
  {
    id: 190,
    name: 'Circus',
    parentId: 7,
    eventType: 'THEATER',
    slug: 'circus',
    heroImagePath: 'https://static.gotickets.com/5c86b9c5-3671-441d-b524-562aaba2b38e.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/e49c01f7-98e9-4122-8939-de176ee08d1d.webp',
  },
  {
    id: 150,
    name: 'Cirque',
    parentId: 7,
    eventType: 'THEATER',
    slug: 'cirque',
    heroImagePath: 'https://static.gotickets.com/f50caea7-da55-4928-b16d-330e1de9bc22.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/a028ce56-d7f0-4f0b-be4e-75f9b2e0edb2.webp',
  },
  {
    id: 191,
    name: 'City',
    parentId: 6,
    eventType: 'CONCERTS',
    slug: 'city',
    heroImagePath: 'https://static.gotickets.com/b38bb2cc-ef07-4f4b-88a6-fcd39b0dbe54.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/1a8c8056-8cfa-4a71-bac9-c1c86c963e21.webp',
  },
  {
    id: 178,
    name: 'Classical',
    parentId: 6,
    eventType: 'CONCERTS',
    slug: 'classical',
    heroImagePath: 'https://static.gotickets.com/1a56610b-0bba-466f-a01d-61ecfb5da826.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/94daafe9-567e-4d01-8e25-657a35913f22.webp',
  },
  {
    id: 204,
    name: 'College Sports',
    parentId: 5,
    eventType: 'SPORTS',
    slug: 'college-sports',
    heroImagePath: 'https://static.gotickets.com/31b75f83-6320-45d3-9c3b-cddd3e72a3a9.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/bf023973-449d-4819-a416-a4bdac750f82.webp',
  },
  {
    id: 138,
    name: 'Country and Folk',
    parentId: 6,
    eventType: 'CONCERTS',
    slug: 'country-and-folk',
    heroImagePath: 'https://static.gotickets.com/684d3e84-2bcc-4d03-9d22-fce87cf83ba3.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/ec656689-f1be-42cb-b754-a9c21e760df9.webp',
  },
  {
    id: 167,
    name: 'Dance/Electronica',
    parentId: 6,
    eventType: 'CONCERTS',
    slug: 'danceelectronica',
    heroImagePath: 'https://static.gotickets.com/5838e95f-4de2-4d18-a48e-d37b168afb3d.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/6ac6d04e-d9f8-49e3-b545-2b3174d2cc22.webp',
  },
  {
    id: 202,
    name: 'e-Sports',
    parentId: 5,
    eventType: 'SPORTS',
    slug: 'e-sports',
    heroImagePath: 'https://static.gotickets.com/4f8c0342-47c7-4b74-8bd5-6566abdc0a17.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/6423ebd7-693e-43b9-80b6-a021575eddf7.webp',
  },
  {
    id: 222,
    name: 'European Soccer',
    parentId: 174,
    eventType: 'SPORTS',
    slug: 'european-soccer',
    heroImagePath: 'https://static.gotickets.com/d6e51c67-9323-4329-9f1d-dcadfdd6aaac.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/abeacc5f-b5b0-49ee-b1d6-39da8a068b4b.webp',
  },
  {
    id: 176,
    name: 'Extreme Sports',
    parentId: 5,
    eventType: 'SPORTS',
    slug: 'extreme-sports',
    heroImagePath: 'https://static.gotickets.com/31af9176-7fd9-4d5e-aef8-1eaf2a1fdfc3.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/772a2a4c-d2e2-4ee7-af6e-34c3ae7951f6.webp',
  },
  {
    id: 226,
    name: 'F1',
    parentId: 168,
    eventType: 'SPORTS',
    slug: 'f1',
    heroImagePath: 'https://static.gotickets.com/a7a865e8-0f47-49ae-b1e6-e192b0527cb0.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/4195cd31-2ee6-4333-abfb-46135fe34a09.webp',
  },
  {
    id: 154,
    name: 'Family',
    parentId: 7,
    eventType: 'THEATER',
    slug: 'family',
    heroImagePath: 'https://static.gotickets.com/850fd5b1-7e98-4bf2-b97f-89141ad7eb9a.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/444db506-0742-4aab-88f7-807af17821cf.webp',
  },
  {
    id: 159,
    name: 'Fighting',
    parentId: 5,
    eventType: 'SPORTS',
    slug: 'fighting',
    heroImagePath: 'https://static.gotickets.com/e023301d-a92b-4748-ab29-b5b91a62cf94.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/4950ff88-5d6a-4b2e-9857-66fe2a085c4a.webp',
  },
  {
    id: 237,
    name: 'Food and Drink',
    parentId: 186,
    eventType: 'CONCERTS',
    slug: 'food-and-drink',
    heroImagePath: 'https://static.gotickets.com/8587ec0a-89ab-4642-8d76-d71d7b726597.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/0d43925d-25ba-4448-9293-c0749b462cd8.webp',
  },
  {
    id: 187,
    name: 'Football',
    parentId: 5,
    eventType: 'SPORTS',
    slug: 'football',
    heroImagePath: 'https://static.gotickets.com/41c8b273-9ba1-4603-8241-dfbb3ee46390.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/4b795997-7ecd-45c7-ace7-608b0093c490.webp',
  },
  {
    id: 234,
    name: 'Funk',
    parentId: 6,
    eventType: 'CONCERTS',
    slug: 'funk',
    heroImagePath: 'https://static.gotickets.com/b7dfb3ec-203d-482b-9058-b5f14902016f.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/a0c95838-75cb-4dfc-8cdc-c3ca0e44ec97.webp',
  },
  {
    id: 209,
    name: 'Golf',
    parentId: 5,
    eventType: 'SPORTS',
    slug: 'golf',
    heroImagePath: 'https://static.gotickets.com/2a6e53fd-613c-44e6-bb45-ce7f3f2337e5.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/4fa64dc5-5fde-464a-8d35-ae6b71af92a3.webp',
  },
  {
    id: 240,
    name: 'Gospel',
    parentId: 6,
    eventType: 'CONCERTS',
    slug: 'gospel',
    heroImagePath: 'https://static.gotickets.com/cad82156-0027-4b27-82ef-63559c62c85d.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/3800ba7d-4d07-4b71-9ec9-bb79466f9fce.webp',
  },
  {
    id: 179,
    name: 'Gymnastics',
    parentId: 5,
    eventType: 'SPORTS',
    slug: 'gymnastics',
    heroImagePath: 'https://static.gotickets.com/9e39cee2-f3e6-4de4-acb6-0f23cf13138b.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/302a9b79-0aec-4d49-8dd2-c037e5ca7a5d.webp',
  },
  {
    id: 140,
    name: 'Hard Rock',
    parentId: 6,
    eventType: 'CONCERTS',
    slug: 'hard-rock',
    heroImagePath: 'https://static.gotickets.com/78b00615-d69d-4fff-af97-02c139a5dba6.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/735173f3-bc99-48a3-a16b-c880fa513f3d.webp',
  },
  {
    id: 239,
    name: 'Hawaiian',
    parentId: 6,
    eventType: 'CONCERTS',
    slug: 'hawaiian',
    heroImagePath: 'https://static.gotickets.com/3e803ce9-8769-4c96-a5fa-bbf9fb032eb5.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/3b012667-e16a-4895-91b9-40179c229cf7.webp',
  },
  {
    id: 233,
    name: 'Heavy Metal',
    parentId: 6,
    eventType: 'CONCERTS',
    slug: 'heavy-metal',
    heroImagePath: 'https://static.gotickets.com/5e546f47-2fb8-47cd-9bf2-acc9ce14cd59.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/c7384d9b-c4d6-4dfc-b0bc-1054e56f64e7.webp',
  },
  {
    id: 161,
    name: 'Hockey',
    parentId: 5,
    eventType: 'SPORTS',
    slug: 'hockey',
    heroImagePath: 'https://static.gotickets.com/bb164386-85ea-4b9f-84c4-566be01acd25.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/dbf05e5c-17a6-4b40-a48e-54c884165f6b.webp',
  },
  {
    id: 243,
    name: 'Holiday',
    parentId: 7,
    eventType: 'THEATER',
    slug: 'holiday',
    heroImagePath: 'https://static.gotickets.com/0aa3ba47-8d4a-40d9-8c64-ee038fd03120.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/9c625aa5-a65e-4bed-9b32-2a433bfb8e25.webp',
  },
  {
    id: 195,
    name: 'Horse Racing',
    parentId: 5,
    eventType: 'SPORTS',
    slug: 'horse-racing',
    heroImagePath: 'https://static.gotickets.com/a1e8f328-3bf7-4549-8ed1-15b8ebb3e0b0.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/88a3eb43-4a0d-4ec6-aadf-dcc65f0a32bd.webp',
  },
  {
    id: 232,
    name: 'Indie',
    parentId: 6,
    eventType: 'CONCERTS',
    slug: 'indie',
    heroImagePath: 'https://static.gotickets.com/df89d50f-7ec4-48ef-8644-d1812111fbed.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/fcd6a84e-d492-4e80-84ae-86dde73ec7db.webp',
  },
  {
    id: 223,
    name: 'International Soccer',
    parentId: 174,
    eventType: 'SPORTS',
    slug: 'international-soccer',
    heroImagePath: 'https://static.gotickets.com/61db542c-6215-4001-aac0-872bf28e7f36.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/806ce204-1667-4293-bb07-c4a67e6663d1.webp',
  },
  {
    id: 165,
    name: 'K-pop',
    parentId: 6,
    eventType: 'CONCERTS',
    slug: 'k-pop',
    heroImagePath: 'https://static.gotickets.com/53a8de7a-b495-4835-81d5-3bb332da5f4b.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/d1114380-141b-4198-afcd-eb4b6241777a.webp',
  },
  {
    id: 225,
    name: 'Kickboxing',
    parentId: 159,
    eventType: 'SPORTS',
    slug: 'kickboxing',
    heroImagePath: 'https://static.gotickets.com/a09bf6c8-1db5-4e84-ae46-a0d3f21dd453.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/dc7e7083-f79e-46cb-a263-779d01fd4715.webp',
  },
  {
    id: 196,
    name: 'Lacrosse',
    parentId: 5,
    eventType: 'SPORTS',
    slug: 'lacrosse',
    heroImagePath: 'https://static.gotickets.com/410087b7-f50e-4721-928a-721ce0511838.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/32b73b41-df31-4c29-a49f-3eaad951b997.webp',
  },
  {
    id: 158,
    name: 'Latin Music',
    parentId: 6,
    eventType: 'CONCERTS',
    slug: 'latin-music',
    heroImagePath: 'https://static.gotickets.com/bf760be3-c21e-469a-9020-31092dbff7c5.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/6fbfcf03-dff1-4ff0-bf58-d5daf6f6ff17.webp',
  },
  {
    id: 208,
    name: 'LIV Golf',
    parentId: 209,
    eventType: 'SPORTS',
    slug: 'liv-golf',
    heroImagePath: 'https://static.gotickets.com/cd080a79-f42f-4379-b234-b9e1999032b7.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/f2d220ac-0b8d-4772-a42a-8d65e3e3d60f.webp',
  },
  {
    id: 162,
    name: 'Magic',
    parentId: 7,
    eventType: 'THEATER',
    slug: 'magic',
    heroImagePath: 'https://static.gotickets.com/9ae140be-82f7-46e5-b77e-12fc66ee120d.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/9126be80-6f95-43f9-916c-bd80fc0d053f.webp',
  },
  {
    id: 180,
    name: 'Minor League Baseball',
    parentId: 188,
    eventType: 'SPORTS',
    slug: 'minor-league-baseball',
    heroImagePath: 'https://static.gotickets.com/7d02007a-ebe4-4a78-84f8-3d7b81a2402d.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/8ff11e9f-785c-4c0f-8630-6dac3a95e901.webp',
  },
  {
    id: 228,
    name: 'Minor League Hockey',
    parentId: 161,
    eventType: 'SPORTS',
    slug: 'minor-league-hockey',
    heroImagePath: 'https://static.gotickets.com/1af6d676-8dce-4a51-acd1-c4bb407c1900.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/bcbe886a-095d-4277-bdbf-d2ac2fd03a71.webp',
  },
  {
    id: 215,
    name: 'Mixed Martial Arts',
    parentId: 159,
    eventType: 'SPORTS',
    slug: 'mma',
    heroImagePath: 'https://static.gotickets.com/9d9b9d48-ce97-4e9e-a223-28645876130b.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/ed74e290-0268-4d6a-ac1f-282b0d9b85f3.webp',
  },
  {
    id: 171,
    name: 'MLB Baseball',
    parentId: 188,
    eventType: 'SPORTS',
    slug: 'mlb-baseball',
    heroImagePath: 'https://static.gotickets.com/fedbeb80-493f-40f1-91c6-77e0c8ef8fb9.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/466ea6ac-8e0d-40bb-9dfb-b5fc9c04bb63.webp',
  },
  {
    id: 206,
    name: 'MLS Soccer',
    parentId: 174,
    eventType: 'SPORTS',
    slug: 'mls-soccer',
    heroImagePath: 'https://static.gotickets.com/d32f04ff-602e-4630-abd7-fe6c65e46d04.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/19fb6f7e-dfd7-4cdb-bdf9-6d74aad4e8ab.webp',
  },
  {
    id: 227,
    name: 'Monster Trucks',
    parentId: 176,
    eventType: 'SPORTS',
    slug: 'monster-trucks',
    heroImagePath: 'https://static.gotickets.com/73763a15-ab68-4736-a3b0-e0ac71308e66.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/fb6637b7-89b8-4c57-a61f-15d2d47f9d4e.webp',
  },
  {
    id: 218,
    name: 'Motorcross',
    parentId: 176,
    eventType: 'SPORTS',
    slug: 'motorcross',
    heroImagePath: 'https://static.gotickets.com/5ca024ff-295d-46aa-aa64-95327f9b67e6.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/40a3bf62-ee04-434e-8dc3-cc5c9c53c35a.webp',
  },
  {
    id: 151,
    name: 'Motorsports',
    parentId: 5,
    eventType: 'SPORTS',
    slug: 'motorsports',
    heroImagePath: 'https://static.gotickets.com/ed320a4e-5c98-45f2-9601-d076398d65c3.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/1f48bf69-1c6a-4b21-84d3-07a0ec4c7c3b.webp',
  },
  {
    id: 186,
    name: 'Music Festivals',
    parentId: 6,
    eventType: 'CONCERTS',
    slug: 'music-festivals',
    heroImagePath: 'https://static.gotickets.com/1af59d1f-92f6-46c1-8d40-ed2394ba6eaa.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/aa52da56-d6c4-4e9b-88cd-3eca8e2b38d6.webp',
  },
  {
    id: 144,
    name: 'Musical',
    parentId: 7,
    eventType: 'THEATER',
    slug: 'musical',
    heroImagePath: 'https://static.gotickets.com/52986693-9cee-42ca-af2b-256521c4e5ee.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/e1de0074-bb07-44c2-9abc-ebbf4d96a781.webp',
  },
  {
    id: 170,
    name: 'NASCAR Racing',
    parentId: 168,
    eventType: 'SPORTS',
    slug: 'nascar-racing',
    heroImagePath: 'https://static.gotickets.com/759cadd5-0806-4be1-9a91-aa8b045c0e3f.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/51024898-60ef-4192-931b-bcaf42f97d6e.webp',
  },
  {
    id: 175,
    name: 'NBA Basketball',
    parentId: 177,
    eventType: 'SPORTS',
    slug: 'nba-basketball',
    heroImagePath: 'https://static.gotickets.com/fba8c7f3-a508-48c6-862c-6ec36c884082.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/693731dd-f58d-40aa-ae7d-a1be498fae73.webp',
  },
  {
    id: 182,
    name: 'NCAA Football',
    parentId: 187,
    eventType: 'SPORTS',
    slug: 'ncaa-football',
    heroImagePath: 'https://static.gotickets.com/f06462d5-1531-435b-bf91-746acbc3e564.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/4eea2566-9f75-42b2-8fe7-90bbca5af5ed.webp',
  },
  {
    id: 172,
    name: 'NCAA Mens Baseball',
    parentId: 188,
    eventType: 'SPORTS',
    slug: 'ncaa-mens-baseball',
    heroImagePath: 'https://static.gotickets.com/4d3c22ca-c315-45e0-afee-83e1ce076476.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/cba3832e-5600-4a83-a63b-435c81746b2a.webp',
  },
  {
    id: 157,
    name: 'NCAA Mens Basketball',
    parentId: 177,
    eventType: 'SPORTS',
    slug: 'ncaa-mens-basketball',
    heroImagePath: 'https://static.gotickets.com/3af66433-c141-4bdc-9b63-c880801b5812.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/8a4ae9f5-e93a-4370-9fea-b3c7a4e76d1d.webp',
  },
  {
    id: 253,
    name: 'NCAA Mens Gymnastics',
    parentId: 179,
    eventType: 'SPORTS',
    slug: 'ncaa-mens-gymnastics',
    heroImagePath: 'https://static.gotickets.com/86239af3-33b2-4356-a896-f20d138ba031.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/21696c9f-7532-4731-9c57-655c35433e05.webp',
  },
  {
    id: 211,
    name: 'NCAA Mens Hockey',
    parentId: 161,
    eventType: 'SPORTS',
    slug: 'ncaa-mens-hockey',
    heroImagePath: 'https://static.gotickets.com/b7fc6000-9ffd-470e-a6be-033ca1610375.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/167a6e13-7c7d-44ff-94ed-fd0b8942403f.webp',
  },
  {
    id: 205,
    name: 'NCAA Mens Lacrosse',
    parentId: 196,
    eventType: 'SPORTS',
    slug: 'ncaa-mens-lacrosse',
    heroImagePath: 'https://static.gotickets.com/b6548cea-a8c5-4248-9ac0-d0ab7602f001.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/3cd3422f-a6bb-4404-bc67-b512d97a0e48.webp',
  },
  {
    id: 255,
    name: 'NCAA Mens Rugby',
    parentId: 251,
    eventType: 'SPORTS',
    slug: 'ncaa-mens-rugby',
  },
  {
    id: 230,
    name: 'NCAA Mens Soccer',
    parentId: 174,
    eventType: 'SPORTS',
    slug: 'ncaa-mens-soccer',
    heroImagePath: 'https://static.gotickets.com/d28bc2eb-c0f3-43c0-b5f8-79c85c88950d.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/2888641e-929f-4c9a-86e0-3ac1875f3b1a.webp',
  },
  {
    id: 248,
    name: 'NCAA Mens Volleyball',
    parentId: 197,
    eventType: 'SPORTS',
    slug: 'ncaa-mens-volleyball',
    heroImagePath: 'https://static.gotickets.com/5fd4efca-f25c-42ec-8852-42d26fa68968.webp',
  },
  {
    id: 210,
    name: 'NCAA Mens Wrestling',
    parentId: 166,
    eventType: 'SPORTS',
    slug: 'ncaa-wrestling',
    heroImagePath: 'https://static.gotickets.com/6628a1cd-6a90-48ef-b12e-d46643b43041.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/6ed89e61-abae-4d93-88d5-2a715f4f34a4.webp',
  },
  {
    id: 251,
    name: 'NCAA Sports',
    parentId: 5,
    eventType: 'SPORTS',
    slug: 'ncaa-sports',
    heroImagePath: 'https://static.gotickets.com/cb88f5c6-57ed-47fa-801f-77733141605b.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/2143d58f-188a-4ef7-bde1-a24a7bd2a5e7.webp',
  },
  {
    id: 214,
    name: 'NCAA Womens Basketball',
    parentId: 177,
    eventType: 'SPORTS',
    slug: 'ncaa-womens-basketball',
    heroImagePath: 'https://static.gotickets.com/9f472807-aaee-4194-98da-6283f059fe4f.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/9ab47317-1cb2-453b-84aa-29784a6b4679.webp',
  },
  {
    id: 216,
    name: 'NCAA Womens Gymnastics',
    parentId: 179,
    eventType: 'SPORTS',
    slug: 'ncaa-womens-gymnastics',
    heroImagePath: 'https://static.gotickets.com/1ea4ec13-60f5-4cdd-996d-a5c182ff99cb.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/509b863a-b4fb-4e88-bee2-376f1135394c.webp',
  },
  {
    id: 249,
    name: 'NCAA Womens Hockey',
    parentId: 161,
    eventType: 'SPORTS',
    slug: 'ncaa-womens-hockey',
    heroImagePath: 'https://static.gotickets.com/7b2ee11e-a5ff-449e-bcdb-f296648b178a.webp',
  },
  {
    id: 247,
    name: 'NCAA Womens Lacrosse',
    parentId: 196,
    eventType: 'SPORTS',
    slug: 'ncaa-womens-lacrosse',
    heroImagePath: 'https://static.gotickets.com/7679889d-198b-487a-a697-211ae0b7b162.webp',
  },
  {
    id: 254,
    name: 'NCAA Womens Rugby',
    parentId: 251,
    eventType: 'SPORTS',
    slug: 'ncaa-womens-rugby',
  },
  {
    id: 231,
    name: 'NCAA Womens Soccer',
    parentId: 174,
    eventType: 'SPORTS',
    slug: 'ncaa-womens-soccer',
    heroImagePath: 'https://static.gotickets.com/e6af534a-b7cd-4e08-91cd-188d39074fd8.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/3a08ab00-d5b7-44cf-8267-98326db707d2.webp',
  },
  {
    id: 213,
    name: 'NCAA Womens Softball',
    parentId: 142,
    eventType: 'SPORTS',
    slug: 'ncaa-womens-softball',
    heroImagePath: 'https://static.gotickets.com/b1525640-1aa3-4e1e-abd9-08eab2c2af36.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/9a7f252d-7991-441e-8c73-e3f4550de962.webp',
  },
  {
    id: 207,
    name: 'NCAA Womens Volleyball',
    parentId: 197,
    eventType: 'SPORTS',
    slug: 'ncaa-womens-volleyball',
    heroImagePath: 'https://static.gotickets.com/3524ca2f-dd68-4751-984d-eb684865a785.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/a6d44b42-0af4-4cd1-8255-d6c106ce9e68.webp',
  },
  {
    id: 252,
    name: 'NCAA Womens Wrestling',
    parentId: 166,
    eventType: 'SPORTS',
    slug: 'ncaa-womens-wrestling',
    heroImagePath: 'https://static.gotickets.com/9bdf0c48-3236-4451-aa59-059bfe26f868.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/200f8229-0a75-4a05-8e02-cfe8ab127d92.webp',
  },
  {
    id: 163,
    name: 'New Age',
    parentId: 6,
    eventType: 'CONCERTS',
    slug: 'new-age',
    heroImagePath: 'https://static.gotickets.com/2c07faa5-b86b-4fc8-b9d8-8caf836cd3c0.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/a96b863f-610a-479f-8a0f-6c7d5be4de6b.webp',
  },
  {
    id: 181,
    name: 'NFL Football',
    parentId: 187,
    eventType: 'SPORTS',
    slug: 'nfl-football',
    heroImagePath: 'https://static.gotickets.com/794db92e-399c-45b0-acb2-cdf98b7526fe.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/995e8497-aeb3-495c-9d50-71d0a401d503.webp',
  },
  {
    id: 183,
    name: 'NHL Hockey',
    parentId: 161,
    eventType: 'SPORTS',
    slug: 'nhl-hockey',
    heroImagePath: 'https://static.gotickets.com/6b1a52ab-dd7f-432a-9a0a-2cb1ac454613.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/d1d20c28-a73f-47e0-8701-f935ec1533d9.webp',
  },
  {
    id: 200,
    name: 'Off-Broadway',
    parentId: 7,
    eventType: 'THEATER',
    slug: 'off-broadway',
    heroImagePath: 'https://static.gotickets.com/7ea7faa8-b85c-4cec-9996-3c5218757c8d.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/34af8aa5-5f9d-4aec-8ec0-34bec087ead6.webp',
  },
  {
    id: 224,
    name: 'Olympic Sports',
    parentId: 5,
    eventType: 'SPORTS',
    slug: 'olympic-sports',
    heroImagePath: 'https://static.gotickets.com/2e80168f-eb95-4254-9305-7ecc6f2b00e8.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/e40bf926-af71-4964-bb99-6a35781e5f6c.webp',
  },
  {
    id: 160,
    name: 'Opera',
    parentId: 6,
    eventType: 'CONCERTS',
    slug: 'opera',
    heroImagePath: 'https://static.gotickets.com/eb5cea36-1f50-43e9-8728-e7b02f4254bb.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/b9912fdc-f09e-4058-9f97-c852f45f83ed.webp',
  },
  {
    id: 185,
    name: 'Other Concerts',
    parentId: 6,
    eventType: 'CONCERTS',
    slug: 'other-concerts',
    heroImagePath: 'https://static.gotickets.com/dbf37b99-5c77-49e9-a098-08663730dcdc.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/e064f9c9-b680-4988-a614-f09bc7c6d0fd.webp',
  },
  {
    id: 143,
    name: 'Other Sports',
    parentId: 5,
    eventType: 'SPORTS',
    slug: 'other-sports',
    heroImagePath: 'https://static.gotickets.com/235fb678-b387-4542-9e44-5d726e2d2cb1.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/518b5c8d-5f23-428d-b606-f517410b2111.webp',
  },
  {
    id: 155,
    name: 'Other Theater',
    parentId: 7,
    eventType: 'THEATER',
    slug: 'other-theater',
    heroImagePath: 'https://static.gotickets.com/d2ad7446-3a6a-42e0-954c-17b654ccbc47.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/f533a3c8-d956-4d6c-be9b-92b3fbcf73bd.webp',
  },
  {
    id: 192,
    name: 'PGA Golf',
    parentId: 209,
    eventType: 'SPORTS',
    slug: 'pga-golf',
    heroImagePath: 'https://static.gotickets.com/3d4821c6-8890-4201-a00d-8ec634276b34.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/d5154366-b892-4f69-b743-045f952b71c2.webp',
  },
  {
    id: 194,
    name: 'Podcast',
    parentId: 7,
    eventType: 'THEATER',
    slug: 'podcast',
    heroImagePath: 'https://static.gotickets.com/3dcc2db5-8caa-443a-bea5-60153ae03e10.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/9e3070ef-8a71-4aea-aede-0f275c8ef7ea.webp',
  },
  {
    id: 242,
    name: 'Poetry',
    parentId: 7,
    eventType: 'THEATER',
    slug: 'poetry',
    heroImagePath: 'https://static.gotickets.com/c2c3ffc2-4ea9-43a2-92ab-32ec0b9751e3.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/8bce1cf9-d0f2-438c-a3ea-a2e2dd56c6ec.webp',
  },
  {
    id: 141,
    name: 'Pop',
    parentId: 6,
    eventType: 'CONCERTS',
    slug: 'pop',
    heroImagePath: 'https://static.gotickets.com/472edace-232c-4c65-ab75-959c6463eece.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/370c2f54-f6c2-478e-a0c1-e84593e3e6e1.webp',
  },
  {
    id: 212,
    name: 'Pro Wrestling',
    parentId: 166,
    eventType: 'SPORTS',
    slug: 'pro-wrestling',
    heroImagePath: 'https://static.gotickets.com/a21c47af-a0b1-442e-9f6b-dd74d3ad6306.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/6433c7ec-520d-41ca-9ac3-5645cb9fe59e.webp',
  },
  {
    id: 148,
    name: 'Public Speaking',
    parentId: 7,
    eventType: 'THEATER',
    slug: 'public-speaking',
    heroImagePath: 'https://static.gotickets.com/0f0e5f8c-a2a1-4900-be41-f9b4d8451d70.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/ce3d42a4-683b-4c9d-b504-c3d9842bc5f5.webp',
  },
  {
    id: 229,
    name: 'Punk',
    parentId: 6,
    eventType: 'CONCERTS',
    slug: 'punk',
    heroImagePath: 'https://static.gotickets.com/01356562-22a8-4003-bcae-6518f1657587.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/57a3d99a-3e72-429d-86c2-da89ffcae78f.webp',
  },
  {
    id: 149,
    name: 'R&B',
    parentId: 6,
    eventType: 'CONCERTS',
    slug: 'rb',
    heroImagePath: 'https://static.gotickets.com/ef86c515-24fb-4f9c-ba8e-ecc58d1596de.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/9d40b280-3aa0-47bb-b36c-8d074cfa1524.webp',
  },
  {
    id: 145,
    name: 'Rap/Hip Hop',
    parentId: 6,
    eventType: 'CONCERTS',
    slug: 'rap-hip-hop',
    heroImagePath: 'https://static.gotickets.com/0a4f9a68-4531-4619-9fbc-4a65afd0380c.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/8ef81758-4f8b-44a9-9e77-a0ecfaebb8d1.webp',
  },
  {
    id: 173,
    name: 'Reggae',
    parentId: 6,
    eventType: 'CONCERTS',
    slug: 'reggae',
    heroImagePath: 'https://static.gotickets.com/fd485eca-ecbe-48bf-9567-01808127ebdd.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/a13f6053-6c3a-4156-91dc-170d8f5d52f9.webp',
  },
  {
    id: 137,
    name: 'Rock',
    parentId: 6,
    eventType: 'CONCERTS',
    slug: 'rock',
    heroImagePath: 'https://static.gotickets.com/042c0fb3-d224-4320-b161-25da02a894ea.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/f360004e-9aa0-4ff0-bf18-09182b735cd7.webp',
  },
  {
    id: 156,
    name: 'Rodeo',
    parentId: 5,
    eventType: 'SPORTS',
    slug: 'rodeo',
    heroImagePath: 'https://static.gotickets.com/16495a52-bbbe-4199-9c14-d343d76caea1.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/f5501329-9c93-44f8-94f8-142b54dcd0af.webp',
  },
  {
    id: 201,
    name: 'Rugby',
    parentId: 5,
    eventType: 'SPORTS',
    slug: 'rugby',
    heroImagePath: 'https://static.gotickets.com/91608c63-91fb-47b3-a729-0ae117079e03.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/8eb22135-c939-4b01-9249-2135b5d47ee9.webp',
  },
  {
    id: 193,
    name: 'Skating',
    parentId: 5,
    eventType: 'SPORTS',
    slug: 'skating',
    heroImagePath: 'https://static.gotickets.com/7e296c61-3858-4f22-868c-1f202db12061.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/beb31c8d-b4a5-43b8-802a-5b42f0fa082b.webp',
  },
  {
    id: 174,
    name: 'Soccer',
    parentId: 5,
    eventType: 'SPORTS',
    slug: 'soccer',
    heroImagePath: 'https://static.gotickets.com/4636aea3-e8e6-4649-bdfa-196925c188af.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/e1613172-a1ed-4fe3-9b9a-2d44b43fcc74.webp',
  },
  {
    id: 142,
    name: 'Softball',
    parentId: 5,
    eventType: 'SPORTS',
    slug: 'softball',
    heroImagePath: 'https://static.gotickets.com/c168395c-36d4-4a24-8471-54853f5486ed.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/2dcaf8e9-3ab1-4d17-9518-07da5d0c5995.webp',
  },
  {
    id: 246,
    name: 'Soul',
    parentId: 6,
    eventType: 'CONCERTS',
    slug: 'soul',
    heroImagePath: 'https://static.gotickets.com/42e09053-ad83-4ebe-a9fa-1d0dc3ce2ac8.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/8f6c4d56-b255-4bf9-9f66-07133cbea074.webp',
  },
  {
    id: 219,
    name: 'Supercross',
    parentId: 176,
    eventType: 'SPORTS',
    slug: 'supercross',
    heroImagePath: 'https://static.gotickets.com/143d72e2-3e01-44ce-8ce1-0f31a28ffa7f.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/56e5f660-afdc-46e2-8489-8f78b367bd9d.webp',
  },
  {
    id: 236,
    name: 'Symphony',
    parentId: 6,
    eventType: 'CONCERTS',
    slug: 'symphony',
    heroImagePath: 'https://static.gotickets.com/3a25536f-0050-4ea8-bdbf-8414845d4521.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/07a8b202-31ea-4f8b-938e-5552f499c03f.webp',
  },
  {
    id: 169,
    name: 'Tennis',
    parentId: 5,
    eventType: 'SPORTS',
    slug: 'tennis',
    heroImagePath: 'https://static.gotickets.com/e9780bb1-7896-42b0-80fc-5eda62a0f69a.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/be96233d-849b-4409-96bd-20d861b83d3e.webp',
  },
  {
    id: 244,
    name: 'Tribute',
    parentId: 6,
    eventType: 'CONCERTS',
    slug: 'tribute',
    heroImagePath: 'https://static.gotickets.com/66933716-6fc6-41b1-b4a9-d49faa54e575.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/e5c6d4d8-fe7d-44c6-a27c-641b9f659f0f.webp',
  },
  {
    id: 217,
    name: 'Truck Racing',
    parentId: 168,
    eventType: 'SPORTS',
    slug: 'truck-racing',
    heroImagePath: 'https://static.gotickets.com/4edd1f86-6999-4f07-ba9d-9be66897307b.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/2c3cf3ab-0c25-4426-865a-36ec4891c64e.webp',
  },
  {
    id: 198,
    name: 'UFL',
    parentId: 187,
    eventType: 'SPORTS',
    slug: 'ufl',
    heroImagePath: 'https://static.gotickets.com/03c49a4f-65b6-4da2-ac03-2dcdc9f969eb.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/c0cf9616-8c7c-4eec-80b4-64314c68d7c6.webp',
  },
  {
    id: 221,
    name: 'US Minor League Soccer',
    parentId: 174,
    eventType: 'SPORTS',
    slug: 'us-minor-league-soccer',
    heroImagePath: 'https://static.gotickets.com/813d4f92-920c-4352-a22e-06bef296937e.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/a47a288f-05b1-43ba-a1a3-e475a520d5d6.webp',
  },
  {
    id: 197,
    name: 'Volleyball',
    parentId: 5,
    eventType: 'SPORTS',
    slug: 'volleyball',
    heroImagePath: 'https://static.gotickets.com/b65c2da7-fe59-4718-bba5-40e918f2647b.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/becd3174-7ee5-4ff9-a62d-a34340937a35.webp',
  },
  {
    id: 199,
    name: 'WNBA',
    parentId: 177,
    eventType: 'SPORTS',
    slug: 'wnba',
    heroImagePath: 'https://static.gotickets.com/bba93495-a8a5-4a86-9ea7-ef3d9dbd1f1e.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/433b4906-070c-4526-849f-87ce4b0a25ef.webp',
  },
  {
    id: 152,
    name: 'World Music',
    parentId: 6,
    eventType: 'CONCERTS',
    slug: 'world-music',
    heroImagePath: 'https://static.gotickets.com/c2ddb3ed-3a68-4295-b138-47d923a6ac15.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/3589f74d-97ce-4afb-86bb-7d7d832d37d5.webp',
  },
  {
    id: 166,
    name: 'Wrestling',
    parentId: 5,
    eventType: 'SPORTS',
    slug: 'wrestling',
    heroImagePath: 'https://static.gotickets.com/78b9980b-c292-42f5-b36a-4ad2df7116f2.webp',
    performerHeroImagePath:
      'https://static.gotickets.com/3b75195b-c580-4934-9bfd-59ba70bd0c87.webp',
  },
];
