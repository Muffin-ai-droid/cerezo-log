import React, { useState, useEffect, useRef } from 'react';
import {
  Home, List, BarChart2, User, Plus, Bell, ChevronRight, ChevronLeft,
  Calendar, Trophy, Flag, MapPin, Users, Star, Tag as TagIcon,
  Image as ImageIcon,
  Wallet, Ticket, ShoppingBag, Utensils, Train, MoreHorizontal,
  Clock, Trash2, CheckCircle2, Bookmark, PenSquare, Shirt,
  Sun, Tv, Shield, Menu, Medal, CirclePlus, Pencil, Building2
} from 'lucide-react';

const purple = '#3b1378';

const initialRecords = [];

const defaultDraft = {
  date: '',
  tournament: '',
  matchSection: '',
  opponent: '',
  homeScore: '',
  awayScore: '',
  stadium: '',
  seat: '',
  seatBlock: '',
  seatRow: '',
  seatNumber: '',
  weather: '',
  companion: '',
  watchType: '',
  venueType: 'HOME',
  rating: 0,
  mvp: '',
  formation: '3-4-2-1',
  lineup: {},
  scorers: [],
  memo: '',
  tags: [],
  photos: [],
  expenses: { ticket: '', goods: '', food: '', transport: '', other: '' },

  timeline: [

  ]

};
const defaultProfile = {
  name: '無名',
  photo: null,
  photoX: 50,
  photoY: 50,
  favoritePlayer: '',
  favoriteStadium: '',
};

const sanfrecceTeam = {
  name: 'サンフレッチェ広島',
  short: '広島',
  main: '#4b1c89',
  sub: '#f1f1f1',
  stadium: 'エディオンピースウイング広島',
};

const matchSchedule = [
  {
    section: 1,
    date: '2026-08-08',
    displayDate: '8.8 / 8.9',
    day: '土日',
    time: '未定',
    opponent: 'ジェフユナイテッド千葉',
    stadium: 'エディオンピースウイング広島',
    venueType: 'HOME',
  },
  {
    section: 2,
    date: '2026-08-15',
    displayDate: '8.15 / 8.16',
    day: '土日',
    time: '未定',
    opponent: '浦和レッズ',
    stadium: '埼玉スタジアム2002',
    venueType: 'AWAY',
  },
  {
    section: 3,
    date: '2026-08-22',
    displayDate: '8.22 / 8.23',
    day: '土日',
    time: '未定',
    opponent: '川崎フロンターレ',
    stadium: 'エディオンピースウイング広島',
    venueType: 'HOME',
  },
  {
    section: 4,
    date: '2026-08-29',
    displayDate: '8.29 / 8.30',
    day: '土日',
    time: '未定',
    opponent: 'ガンバ大阪',
    stadium: 'パナソニック スタジアム 吹田',
    venueType: 'AWAY',
  },
  {
    section: 5,
    date: '2026-09-02',
    displayDate: '9.2',
    day: '水',
    time: '未定',
    opponent: '名古屋グランパス',
    stadium: 'エディオンピースウイング広島',
    venueType: 'HOME',
  },
  {
    section: 6,
    date: '2026-09-05',
    displayDate: '9.5 / 9.6',
    day: '土日',
    time: '未定',
    opponent: 'ファジアーノ岡山',
    stadium: 'JFE晴れの国スタジアム',
    venueType: 'AWAY',
  },
  {
    section: 7,
    date: '2026-09-12',
    displayDate: '9.12 / 9.13',
    day: '土日',
    time: '未定',
    opponent: 'セレッソ大阪',
    stadium: 'エディオンピースウイング広島',
    venueType: 'HOME',
  },
  {
    section: 8,
    date: '2026-09-19',
    displayDate: '9.19 / 9.20',
    day: '土日',
    time: '未定',
    opponent: 'アビスパ福岡',
    stadium: 'ベスト電器スタジアム',
    venueType: 'AWAY',
  },
  {
    section: 9,
    date: '2026-10-10',
    displayDate: '10.10 / 10.11',
    day: '土日',
    time: '未定',
    opponent: '東京ヴェルディ',
    stadium: '味の素スタジアム',
    venueType: 'AWAY',
  },
  {
    section: 10,
    date: '2026-10-17',
    displayDate: '10.17 / 10.18',
    day: '土日',
    time: '未定',
    opponent: '京都サンガF.C.',
    stadium: 'エディオンピースウイング広島',
    venueType: 'HOME',
  },
  {
    section: 11,
    date: '2026-10-21',
    displayDate: '10.21',
    day: '水',
    time: '未定',
    opponent: 'V・ファーレン長崎',
    stadium: 'PEACE STADIUM Connected by SoftBank',
    venueType: 'AWAY',
  },
  {
    section: 12,
    date: '2026-10-24',
    displayDate: '10.24 / 10.25',
    day: '土日',
    time: '未定',
    opponent: '清水エスパルス',
    stadium: 'エディオンピースウイング広島',
    venueType: 'HOME',
  },
  {
    section: 13,
    date: '2026-10-31',
    displayDate: '10.31 / 11.1',
    day: '土日',
    time: '未定',
    opponent: '水戸ホーリーホック',
    stadium: 'ケーズデンキスタジアム水戸',
    venueType: 'AWAY',
  },
  {
    section: 14,
    date: '2026-11-07',
    displayDate: '11.7 / 11.8',
    day: '土日',
    time: '未定',
    opponent: 'FC町田ゼルビア',
    stadium: '町田GIONスタジアム',
    venueType: 'AWAY',
  },
  {
    section: 15,
    date: '2026-11-21',
    displayDate: '11.21 / 11.22',
    day: '土日',
    time: '未定',
    opponent: '横浜F・マリノス',
    stadium: 'エディオンピースウイング広島',
    venueType: 'HOME',
  },
  {
    section: 16,
    date: '2026-11-25',
    displayDate: '11.25',
    day: '水',
    time: '未定',
    opponent: 'FC東京',
    stadium: '味の素スタジアム',
    venueType: 'AWAY',
  },
  {
    section: 17,
    date: '2026-11-28',
    displayDate: '11.28 / 11.29',
    day: '土日',
    time: '未定',
    opponent: '柏レイソル',
    stadium: '三協フロンテア柏スタジアム',
    venueType: 'AWAY',
  },
  {
    section: 18,
    date: '2026-12-05',
    displayDate: '12.5 / 12.6',
    day: '土日',
    time: '未定',
    opponent: 'ヴィッセル神戸',
    stadium: 'エディオンピースウイング広島',
    venueType: 'HOME',
  },
  {
    section: 19,
    date: '2026-12-12',
    displayDate: '12.12 / 12.13',
    day: '土日',
    time: '未定',
    opponent: '鹿島アントラーズ',
    stadium: 'エディオンピースウイング広島',
    venueType: 'HOME',
  },
  {
    section: 20,
    date: '2026-12-19',
    displayDate: '12.19',
    day: '土',
    time: '未定',
    opponent: '名古屋グランパス',
    stadium: '豊田スタジアム',
    venueType: 'AWAY',
  },
  {
    section: 21,
    date: '2027-02-13',
    displayDate: '2027.2.13 / 2.14',
    day: '土日',
    time: '未定',
    opponent: 'ファジアーノ岡山',
    stadium: 'エディオンピースウイング広島',
    venueType: 'HOME',
  },
  {
    section: 22,
    date: '2027-02-20',
    displayDate: '2027.2.20 / 2.21',
    day: '土日',
    time: '未定',
    opponent: '東京ヴェルディ',
    stadium: 'エディオンピースウイング広島',
    venueType: 'HOME',
  },
  {
    section: 23,
    date: '2027-02-27',
    displayDate: '2027.2.27 / 2.28',
    day: '土日',
    time: '未定',
    opponent: '清水エスパルス',
    stadium: 'IAIスタジアム日本平',
    venueType: 'AWAY',
  },
  {
    section: 24,
    date: '2027-03-06',
    displayDate: '2027.3.6 / 3.7',
    day: '土日',
    time: '未定',
    opponent: 'セレッソ大阪',
    stadium: 'ヨドコウ桜スタジアム',
    venueType: 'AWAY',
  },
  {
    section: 25,
    date: '2027-03-10',
    displayDate: '2027.3.10',
    day: '水',
    time: '未定',
    opponent: 'アビスパ福岡',
    stadium: 'エディオンピースウイング広島',
    venueType: 'HOME',
  },
  {
    section: 26,
    date: '2027-03-13',
    displayDate: '2027.3.13 / 3.14',
    day: '土日',
    time: '未定',
    opponent: '鹿島アントラーズ',
    stadium: 'メルカリスタジアム',
    venueType: 'AWAY',
  },
  {
    section: 27,
    date: '2027-03-20',
    displayDate: '2027.3.20 / 3.21',
    day: '土日',
    time: '未定',
    opponent: 'ガンバ大阪',
    stadium: 'エディオンピースウイング広島',
    venueType: 'HOME',
  },
  {
    section: 28,
    date: '2027-04-03',
    displayDate: '2027.4.3 / 4.4',
    day: '土日',
    time: '未定',
    opponent: 'ヴィッセル神戸',
    stadium: 'ノエビアスタジアム神戸',
    venueType: 'AWAY',
  },
  {
    section: 29,
    date: '2027-04-10',
    displayDate: '2027.4.10 / 4.11',
    day: '土日',
    time: '未定',
    opponent: '横浜F・マリノス',
    stadium: '日産スタジアム',
    venueType: 'AWAY',
  },
  {
    section: 30,
    date: '2027-04-16',
    displayDate: '2027.4.16',
    day: '金',
    time: '未定',
    opponent: 'FC東京',
    stadium: 'エディオンピースウイング広島',
    venueType: 'HOME',
  },
  {
    section: 31,
    date: '2027-04-24',
    displayDate: '2027.4.24 / 4.25',
    day: '土日',
    time: '未定',
    opponent: 'FC町田ゼルビア',
    stadium: 'エディオンピースウイング広島',
    venueType: 'HOME',
  },
  {
    section: 32,
    date: '2027-04-29',
    displayDate: '2027.4.29',
    day: '木祝',
    time: '未定',
    opponent: 'ジェフユナイテッド千葉',
    stadium: 'フクダ電子アリーナ',
    venueType: 'AWAY',
  },
  {
    section: 33,
    date: '2027-05-03',
    displayDate: '2027.5.3 / 5.4',
    day: '月火',
    time: '未定',
    opponent: '浦和レッズ',
    stadium: 'エディオンピースウイング広島',
    venueType: 'HOME',
  },
  {
    section: 34,
    date: '2027-05-09',
    displayDate: '2027.5.9',
    day: '日',
    time: '未定',
    opponent: 'V・ファーレン長崎',
    stadium: 'エディオンピースウイング広島',
    venueType: 'HOME',
  },
  {
    section: 35,
    date: '2027-05-15',
    displayDate: '2027.5.15 / 5.16',
    day: '土日',
    time: '未定',
    opponent: '京都サンガF.C.',
    stadium: 'サンガスタジアム by KYOCERA',
    venueType: 'AWAY',
  },
  {
    section: 36,
    date: '2027-05-22',
    displayDate: '2027.5.22 / 5.23',
    day: '土日',
    time: '未定',
    opponent: '柏レイソル',
    stadium: 'エディオンピースウイング広島',
    venueType: 'HOME',
  },
  {
    section: 37,
    date: '2027-05-29',
    displayDate: '2027.5.29 / 5.30',
    day: '土日',
    time: '未定',
    opponent: '水戸ホーリーホック',
    stadium: 'エディオンピースウイング広島',
    venueType: 'HOME',
  },
  {
    section: 38,
    date: '2027-06-06',
    displayDate: '2027.6.6',
    day: '日',
    time: '未定',
    opponent: '川崎フロンターレ',
    stadium: 'Uvanceとどろきスタジアム by Fujitsu',
    venueType: 'AWAY',
  },
];



const normalizeDate = (date) => {
  return String(date || '').replaceAll('.', '-').replaceAll('/', '-');
};

const getScheduleMatchFromRecord = (record) => {
  const data = record.draftData || {};

  const recordedSection = data.matchSection || record.matchSection;
  const recordedDate = normalizeDate(data.date || record.date);
  const recordedOpponent = data.opponent || record.opponent;

  // ① 節が入っている記録なら、節で探す
  if (recordedSection) {
    const matchBySection = matchSchedule.find(
      (match) => String(match.section) === String(recordedSection)
    );

    if (matchBySection) return matchBySection;
  }

  // ② 節がない記録用：日付と対戦相手で探す
  return matchSchedule.find((match) => {
    return (
      normalizeDate(match.date) === recordedDate &&
      match.opponent === recordedOpponent
    );
  });
};

const getLatestRecordedScheduleMatch = (records = []) => {
  const recordedScheduleMatches = records
    .map((record) => getScheduleMatchFromRecord(record))
    .filter(Boolean)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return recordedScheduleMatches[0] || null;
};

const getNextMatch = (records = []) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const latestRecordedMatch = getLatestRecordedScheduleMatch(records);

  // 記録済みの試合があり、しかもそれが今日以降の試合なら、
  // その記録した試合の次の節へ進める
  if (latestRecordedMatch) {
    const latestRecordedDate = new Date(latestRecordedMatch.date);
    latestRecordedDate.setHours(0, 0, 0, 0);

    if (latestRecordedDate >= today) {
      return matchSchedule
        .filter((match) => Number(match.section) > Number(latestRecordedMatch.section))
        .sort((a, b) => Number(a.section) - Number(b.section))[0] || null;
    }
  }

  // 記録がない、または最後の記録が過去なら、
  // 日付基準で今日以降の最初の試合へ進める
  return matchSchedule
    .filter((match) => {
      const matchDate = new Date(match.date);
      matchDate.setHours(0, 0, 0, 0);
      return matchDate >= today;
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date))[0] || null;
};
const opponentTeams = [
  { name: '鹿島アントラーズ', short: '鹿島', main: '#b91c1c', sub: '#0f172a', stadium: 'メルカリスタジアム' },
  { name: '水戸ホーリーホック', short: '水戸', main: '#2563eb', sub: '#facc15', stadium: 'ケーズデンキスタジアム水戸' },
  { name: '浦和レッズ', short: '浦和', main: '#dc2626', sub: '#111827', stadium: '埼玉スタジアム2002' },
  { name: 'ジェフユナイテッド千葉', short: '千葉', main: '#facc15', sub: '#16a34a', stadium: 'フクダ電子アリーナ' },
  { name: '柏レイソル', short: '柏', main: '#facc15', sub: '#111827', stadium: '三協フロンテア柏スタジアム' },
  { name: 'FC東京', short: 'FC東京', main: '#1e3a8a', sub: '#dc2626', stadium: '味の素スタジアム' },
  { name: '東京ヴェルディ', short: '東京V', main: '#15803d', sub: '#111827', stadium: '味の素スタジアム' },
  { name: 'FC町田ゼルビア', short: '町田', main: '#1d4ed8', sub: '#111827', stadium: '町田GIONスタジアム' },
  { name: '川崎フロンターレ', short: '川崎F', main: '#38bdf8', sub: '#111827', stadium: 'Uvanceとどろきスタジアム by Fujitsu' },
  { name: '横浜F・マリノス', short: '横浜FM', main: '#1d4ed8', sub: '#dc2626', stadium: '日産スタジアム' },
  { name: '清水エスパルス', short: '清水', main: '#f97316', sub: '#2563eb', stadium: 'IAIスタジアム日本平' },
  { name: '名古屋グランパス', short: '名古屋', main: '#dc2626', sub: '#f97316', stadium: '豊田スタジアム' },
  { name: '京都サンガF.C.', short: '京都', main: '#6d28d9', sub: '#dc2626', stadium: 'サンガスタジアム by KYOCERA' },
  { name: 'ガンバ大阪', short: 'G大阪', main: '#1d4ed8', sub: '#111827', stadium: 'パナソニック スタジアム 吹田' },
  { name: 'セレッソ大阪', short: 'C大阪', main: '#ec4899', sub: '#1d4ed8', stadium: 'ヨドコウ桜スタジアム' },
  { name: 'ヴィッセル神戸', short: '神戸', main: '#7f1d1d', sub: '#111827', stadium: 'ノエビアスタジアム神戸' },
  { name: 'ファジアーノ岡山', short: '岡山', main: '#7f1d1d', sub: '#2563eb', stadium: 'JFE晴れの国スタジアム' },
  { name: 'アビスパ福岡', short: '福岡', main: '#1e3a8a', sub: '#9ca3af', stadium: 'ベスト電器スタジアム' },
  { name: 'V・ファーレン長崎', short: '長崎', main: '#2563eb', sub: '#f97316', stadium: 'PEACE STADIUM Connected by SoftBank' },
];
const stadiumImages = {
  'エディオンピースウイング広島':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/%E3%82%A8%E3%83%87%E3%82%A3%E3%82%AA%E3%83%B3%E3%83%94%E3%83%BC%E3%82%B9%E3%82%A6%E3%82%A4%E3%83%B3%E3%82%B0%E5%BA%83%E5%B3%B6.jpg/1920px-%E3%82%A8%E3%83%87%E3%82%A3%E3%82%AA%E3%83%B3%E3%83%94%E3%83%BC%E3%82%B9%E3%82%A6%E3%82%A4%E3%83%B3%E3%82%B0%E5%BA%83%E5%B3%B6.jpg',

  'メルカリスタジアム':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Kashima_Stadium_1.JPG/1920px-Kashima_Stadium_1.JPG',

  'ケーズデンキスタジアム水戸':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Ksdenkistadium10050501.jpg/1280px-Ksdenkistadium10050501.jpg',

  '埼玉スタジアム2002':
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAGxp9dIFmLwY1gmp0hEPki3BXG7bvW7qivhNNUBecekE4C93MWHIW54PGhycTgEYDkOesVEqWN0YsygQn0wtwJ-bUAsKr8iSWu3C_dK6PX5BWzfnzudXUqmvPwRCMuDC7_eZaQa=s680-w680-h510-rw',

  'フクダ電子アリーナ':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Fukuda_Denshi_Arena_2015-06-14.jpg/1920px-Fukuda_Denshi_Arena_2015-06-14.jpg',

  '三協フロンテア柏スタジアム':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Kashiwa20120311-1_%28cropped%29.jpg/1920px-Kashiwa20120311-1_%28cropped%29.jpg',

  '味の素スタジアム':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Ajinomoto_Stadium_20101120.JPG/1280px-Ajinomoto_Stadium_20101120.JPG',

  '国立競技場':
    'https://cdn-xtech.nikkei.com/atcl/nxt/column/18/01330/00001/01.jpg?__scale=w:800,h:533&_sh=0970610940',

  '町田GIONスタジアム':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Machida-Gion_20211003.jpg/1920px-Machida-Gion_20211003.jpg',

  'Uvanceとどろきスタジアム by Fujitsu':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Todoroki_15031401.JPG/1280px-Todoroki_15031401.JPG',

  '日産スタジアム':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Nissan_International_Stadium_Yokohama.jpg/1920px-Nissan_International_Stadium_Yokohama.jpg',

  'IAIスタジアム日本平':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Nihondaira_stadium20090412a.jpg/1280px-Nihondaira_stadium20090412a.jpg',

  '豊田スタジアム':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Nagoya_Grampus_game_in_Toyota_Stadium_100814.JPG/1280px-Nagoya_Grampus_game_in_Toyota_Stadium_100814.JPG',

  'サンガスタジアム by KYOCERA':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Sanga_stadium_by_kyocera05.jpg/1920px-Sanga_stadium_by_kyocera05.jpg',

  'パナソニック スタジアム 吹田':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/%E3%83%91%E3%83%8A%E3%82%BD%E3%83%8B%E3%83%83%E3%82%AF%E3%82%B9%E3%82%BF%E3%82%B8%E3%82%A2%E3%83%A0%E5%90%B9%E7%94%B0_2023%E5%B9%B45%E6%9C%883%E6%97%A5%E3%82%BB%E3%83%AC%E3%83%83%E3%82%BD%E5%A4%A7%E9%98%AA%E6%88%A6.jpg/1920px-%E3%83%91%E3%83%8A%E3%82%BD%E3%83%8B%E3%83%83%E3%82%AF%E3%82%B9%E3%82%BF%E3%82%B8%E3%82%A2%E3%83%A0%E5%90%B9%E7%94%B0_2023%E5%B9%B45%E6%9C%883%E6%97%A5%E3%82%BB%E3%83%AC%E3%83%83%E3%82%BD%E5%A4%A7%E9%98%AA%E6%88%A6.jpg',

  'ヨドコウ桜スタジアム':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/NagaiBallField220226.jpg/1280px-NagaiBallField220226.jpg',

  'ノエビアスタジアム神戸':
    'https://upload.wikimedia.org/wikipedia/commons/5/57/Inside_View_of_Kobe_Wing_Stadium.jpg',

  'JFE晴れの国スタジアム':
    'https://upload.wikimedia.org/wikipedia/commons/8/81/Momotaro_Stadium_01.jpg',

  'ベスト電器スタジアム':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Best_denki_stadium02.jpg/1280px-Best_denki_stadium02.jpg',

  'PEACE STADIUM Connected by SoftBank':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/PEACE-STADIUM-Connected-by-SoftBank_6-Oct-2024.jpg/1280px-PEACE-STADIUM-Connected-by-SoftBank_6-Oct-2024.jpg',

  default:
    'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=600&q=80',
};


const sanfrecceHomeSeatGroups = [
  {
    label: 'カテゴリー席',
    seats: [
      'カテゴリー1',
      'カテゴリー2',
      'カテゴリー3',
      'カテゴリー4',
      'カテゴリー5',
      'カテゴリー6',
    ],
  },
  {
    label: 'ゴール裏・応援席',
    seats: [
      'サンフレッチェサポーターシート',
      'ホームゴール裏',
      'ビジターシート',
    ],
  },
  {
    label: 'スタンド席',
    seats: [
      'メインスタンド',
      'バックスタンド',
      'ノースサイドシート',
      'サウスサイドシート',
    ],
  },
  {
    label: 'バラエティ席',
    seats: [
      'カウンターシート',
      'テーブルシート',
      'テラスシート',
      'ボックスシート',
      'ペアシート',
      'ファミリーシート',
    ],
  },
  {
    label: '特別席・その他',
    seats: [
      'プレミアム席',
      'ラウンジ席',
      '車いす席',
      'その他',
    ],
  },
];

const awaySeatGroups = [
  {
    label: 'ビジター席',
    seats: [
      'ビジター自由席',
      'ビジター指定席',
    ],
  },
  {
    label: 'ミックス席',
    seats: [
      'メインスタンド・ミックス',
      'バックスタンド・ミックス',
      'ゴール裏・ミックス',
    ],
  },
  {
    label: 'その他',
    seats: [
      'その他',
    ],
  },
];

const defaultSeatGroups = [
  {
    label: '通常席',
    seats: [
      'メインスタンド',
      'バックスタンド',
      'ゴール裏',
    ],
  },
  {
    label: 'ビジター・ミックス',
    seats: [
      'ビジター席',
      'ミックス席',
    ],
  },
  {
    label: 'その他',
    seats: [
      'その他',
    ],
  },
];

const getSeatGroups = (stadium, venueType) => {
  if (stadium === 'エディオンピースウイング広島') {
    return sanfrecceHomeSeatGroups;
  }

  if (venueType === 'AWAY') {
    return awaySeatGroups;
  }

  return defaultSeatGroups;
};
const getStadiumImage = (stadium) => {
  return stadiumImages[stadium] || stadiumImages.default;
};
const moneyToNumber = (value) => {
  return Number(String(value ?? '').replace(/[^0-9]/g, '')) || 0;
};

const formatMoney = (value) => {
  return moneyToNumber(value).toLocaleString();
};
const resizeImage = (file, maxSize = 600, quality = 0.75) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement('canvas');

        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxSize) {
            height = Math.round((height * maxSize) / width);
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width = Math.round((width * maxSize) / height);
            height = maxSize;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        resolve(canvas.toDataURL('image/jpeg', quality));
      };

      img.onerror = reject;
      img.src = reader.result;
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
const formationLayouts = {
  '3-4-2-1': [
    { key: 'CF', label: 'CF', x: 50, y: 10 },
    { key: 'SHADOW1', label: 'シャドー', x: 35, y: 27 },
    { key: 'SHADOW2', label: 'シャドー', x: 65, y: 27 },

    { key: 'LWB', label: '左WB', x: 12, y: 48 },
    { key: 'DMF1', label: 'ボランチ', x: 38, y: 50 },
    { key: 'DMF2', label: 'ボランチ', x: 62, y: 50 },
    { key: 'RWB', label: '右WB', x: 88, y: 48 },

    { key: 'CBL', label: '左SB', x: 28, y: 70 },
    { key: 'CB', label: 'CB', x: 50, y: 70 },
    { key: 'CBR', label: '右SB', x: 72, y: 70 },

    { key: 'GK', label: 'GK', x: 50, y: 90 },
  ],

  '3-4-1-2': [
    { key: 'FW1', label: 'FW', x: 38, y: 10 },
    { key: 'FW2', label: 'FW', x: 62, y: 10 },
    { key: 'OMF', label: 'トップ下', x: 50, y: 28 },

    { key: 'LWB', label: '左WB', x: 12, y: 48 },
    { key: 'DMF1', label: 'ボランチ', x: 38, y: 50 },
    { key: 'DMF2', label: 'ボランチ', x: 62, y: 50 },
    { key: 'RWB', label: '右WB', x: 88, y: 48 },

    { key: 'CBL', label: '左SB', x: 28, y: 70 },
    { key: 'CB', label: 'CB', x: 50, y: 70 },
    { key: 'CBR', label: '右SB', x: 72, y: 70 },

    { key: 'GK', label: 'GK', x: 50, y: 90 },
  ],

  '3-4-3': [
    { key: 'LWG', label: '左WG', x: 30, y: 25 },
    { key: 'CF', label: 'CF', x: 50, y: 15 },
    { key: 'RWG', label: '右WG', x: 70, y: 25 },

    { key: 'LWB', label: '左WB', x: 12, y: 48 },
    { key: 'DMF1', label: 'ボランチ', x: 38, y: 50 },
    { key: 'DMF2', label: 'ボランチ', x: 62, y: 50 },
    { key: 'RWB', label: '右WB', x: 88, y: 48 },

    { key: 'CBL', label: '左SB', x: 28, y: 70 },
    { key: 'CB', label: 'CB', x: 50, y: 70 },
    { key: 'CBR', label: '右SB', x: 72, y: 70 },

    { key: 'GK', label: 'GK', x: 50, y: 90 },
  ],

  '4-2-3-1': [
    { key: 'CF', label: 'CF', x: 50, y: 10 },

    { key: 'LMF', label: '左MF', x: 22, y: 30 },
    { key: 'OMF', label: 'トップ下', x: 50, y: 30 },
    { key: 'RMF', label: '右MF', x: 78, y: 30 },

    { key: 'DMF1', label: 'ボランチ', x: 38, y: 52 },
    { key: 'DMF2', label: 'ボランチ', x: 62, y: 52 },

    { key: 'LB', label: '左SB', x: 15, y: 72 },
    { key: 'CB1', label: 'CB', x: 38, y: 72 },
    { key: 'CB2', label: 'CB', x: 62, y: 72 },
    { key: 'RB', label: '右SB', x: 85, y: 72 },

    { key: 'GK', label: 'GK', x: 50, y: 90 },
  ],

  '4-4-2': [
    { key: 'FW1', label: 'FW', x: 38, y: 15 },
    { key: 'FW2', label: 'FW', x: 62, y: 15 },

    { key: 'LMF', label: '左MF', x: 18, y: 38 },
    { key: 'CMF1', label: '中央MF', x: 40, y: 42 },
    { key: 'CMF2', label: '中央MF', x: 60, y: 42 },
    { key: 'RMF', label: '右MF', x: 82, y: 38 },

    { key: 'LB', label: '左SB', x: 15, y: 72 },
    { key: 'CB1', label: 'CB', x: 38, y: 72 },
    { key: 'CB2', label: 'CB', x: 62, y: 72 },
    { key: 'RB', label: '右SB', x: 85, y: 72 },

    { key: 'GK', label: 'GK', x: 50, y: 90 },
  ],

  '4-3-3': [
    { key: 'LWG', label: '左WG', x: 25, y: 20 },
    { key: 'CF', label: 'CF', x: 50, y: 15 },
    { key: 'RWG', label: '右WG', x: 75, y: 20 },

    { key: 'CMF1', label: '左MF', x: 32, y: 42 },
    { key: 'DMF1', label: 'アンカー', x: 50, y: 52 },
    { key: 'CMF2', label: '右MF', x: 68, y: 42 },

    { key: 'LB', label: '左SB', x: 15, y: 72 },
    { key: 'CB1', label: 'CB', x: 38, y: 72 },
    { key: 'CB2', label: 'CB', x: 62, y: 72 },
    { key: 'RB', label: '右SB', x: 85, y: 72 },

    { key: 'GK', label: 'GK', x: 50, y: 90 },
  ],
};
const playerOptions = [
  { name: '大迫 敬介', number: '1', position: 'GK' },
  { name: '田中 雄大', number: '21', position: 'GK' },
  { name: '小川 煌', number: '43', position: 'GK' },
  { name: '大内 一生', number: '99', position: 'GK' },

  { name: '山崎 大地', number: '3', position: 'DF' },
  { name: '荒木 隼人', number: '4', position: 'DF' },
  { name: '新井 直人', number: '13', position: 'DF' },
  { name: '中野 就斗', number: '15', position: 'DF' },
  { name: '志知 孝明', number: '16', position: 'DF' },
  { name: '佐々木 翔', number: '19', position: 'DF' },
  { name: '塩谷 司', number: '33', position: 'DF' },
  { name: 'キム ジュソン', number: '37', position: 'DF' },

  { name: '川辺 駿', number: '6', position: 'MF' },
  { name: '松本 泰志', number: '14', position: 'MF' },
  { name: '菅 大輝', number: '18', position: 'MF' },
  { name: '東 俊希', number: '24', position: 'MF' },
  { name: '越道 草太', number: '32', position: 'MF' },
  { name: '中島 洋太朗', number: '35', position: 'MF' },
  { name: '小林 志紋', number: '45', position: 'MF' },

  { name: '鈴木 章斗', number: '10', position: 'FW' },
  { name: '加藤 陸次樹', number: '11', position: 'FW' },
  { name: '鮎川 峻', number: '23', position: 'FW' },
  { name: '中村 草太', number: '39', position: 'FW' },
  { name: '前田 直輝', number: '41', position: 'FW' },
];

export default function App() {
  const [view, setView] = useState('home');
  const [saveMessage, setSaveMessage] = useState('');
  const [todayKey, setTodayKey] = useState(() =>
    new Date().toISOString().slice(0, 10)
  );
  const [records, setRecords] = useState(() => {
    try {
      const storedRecords = localStorage.getItem('sanfrel-log-records');
      return storedRecords ? JSON.parse(storedRecords) : initialRecords;
    } catch {
      return initialRecords;
    }
  });
  const [draft, setDraft] = useState(defaultDraft);
  const [editingRecordId, setEditingRecordId] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [detailBackView, setDetailBackView] = useState('home');
  const [profile, setProfile] = useState(() => {
    try {
      const storedProfile = localStorage.getItem('sanfrel-log-profile');
      return storedProfile ? JSON.parse(storedProfile) : defaultProfile;
    } catch {
      return defaultProfile;
    }
  });
  useEffect(() => {
    localStorage.setItem('sanfrel-log-profile', JSON.stringify(profile));
  }, [profile]);

  const [savedDraft, setSavedDraft] = useState(() => {
    try {
      const storedDraft = localStorage.getItem('sanfrel-log-draft');
      return storedDraft ? JSON.parse(storedDraft) : null;
    } catch {
      return null;
    }
  });
  useEffect(() => {
    localStorage.setItem('sanfrel-log-records', JSON.stringify(records));
  }, [records]);
  useEffect(() => {
    if (!saveMessage) return;

    const timer = setTimeout(() => {
      setSaveMessage('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [saveMessage]);
  // ★ 追加：viewが変わるたびにスクロール位置を一番上に戻す処理
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  // ★ 追加：viewが変わるたびにスクロール位置を一番上に戻す処理
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  useEffect(() => {
    const timer = setInterval(() => {
      const nextTodayKey = new Date().toISOString().slice(0, 10);

      setTodayKey((currentTodayKey) =>
        currentTodayKey === nextTodayKey ? currentTodayKey : nextTodayKey
      );
    }, 60 * 1000);

    return () => clearInterval(timer);
  }, []);


  const updateDraft = (updates) => {
    setDraft({ ...draft, ...updates });
  };



  const handleStartCreate = () => {
    setEditingRecordId(null);
    setDraft(defaultDraft);
    setView('step1');
  };

  const handleEditRecord = (record) => {
    setEditingRecordId(record.id);

    setDraft({
      ...defaultDraft,
      ...(record.draftData || {}),
      date: record.draftData?.date || record.date.replaceAll('.', '-'),
      opponent: record.opponent || defaultDraft.opponent,
      stadium: record.stadium || defaultDraft.stadium,
      // ★修正：「で観戦」も取り除くように追加
      companion: record.companion
        ? record.companion.replace('と観戦', '').replace('で観戦', '')
        : defaultDraft.companion,
      tags: record.tag ? [record.tag] : defaultDraft.tags,
    });

    setView('step1');
  };
  const openRecordDetail = (record, backView = 'home') => {
    setSelectedRecord(record);
    setDetailBackView(backView);
    setView('recordDetail');
  };

  const saveProfile = (nextProfile) => {
    setProfile(nextProfile);
    setView('mypage');
  };
  const toggleFavorite = (id) => {
    setRecords(
      records.map((record) =>
        record.id === id
          ? { ...record, favorite: !record.favorite }
          : record
      )
    );
  };
  const handleDeleteRecord = (id) => {
    const ok = window.confirm('この観戦記録を削除しますか？');

    if (!ok) return;

    setRecords((prevRecords) =>
      prevRecords.filter((record) => record.id !== id)
    );

    setSelectedRecord(null);
    setView(detailBackView || 'home');
  };

  const handleDeleteRecords = (ids) => {
    if (!ids.length) return;

    const ok = window.confirm(`${ids.length}件の観戦記録を削除しますか？`);
    if (!ok) return;

    const deleteIdSet = new Set(ids.map(String));

    setRecords((prevRecords) =>
      // ★ 修正：文字（String）に揃えて正しく比較・削除できるようにしました！
      prevRecords.filter((record) => !deleteIdSet.has(String(record.id)))
    );

    setSelectedRecord(null);
  };
  const saveCurrentDraft = () => {
    const draftToSave = {
      ...draft,
      savedAt: new Date().toLocaleString('ja-JP', {
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    localStorage.setItem('sanfrel-log-draft', JSON.stringify(draftToSave));
    setSavedDraft(draftToSave);
    alert('下書きを保存しました');
    setView('home');
  };

  const continueSavedDraft = () => {
    if (!savedDraft) return;

    setEditingRecordId(null);
    setDraft({
      ...defaultDraft,
      ...savedDraft,
    });
    setView('step1');
  };

  const deleteSavedDraft = () => {
    localStorage.removeItem('sanfrel-log-draft');
    setSavedDraft(null);
  };
  const handleSave = () => {
    const savedRecord = {
      id: editingRecordId || Date.now(),
      date: draft.date.replaceAll('-', '.'),
      opponent: draft.opponent,
      score: `サンフレッチェ広島 ${draft.homeScore} - ${draft.awayScore} ${draft.opponent}`,
      stadium: draft.stadium,
      // ★修正：「一人」の時は「一人で観戦」、空の場合は空文字、それ以外は「〜と観戦」にする
      companion: draft.companion === '一人'
        ? '一人で観戦'
        : (draft.companion ? `${draft.companion}と観戦` : ''),
      tag: draft.tags[0] || '観戦記録',
      img: getStadiumImage(draft.stadium),
      favorite: false,
      draftData: { ...draft },
    };

    if (editingRecordId) {
      setRecords(
        records.map((record) =>
          record.id === editingRecordId
            ? {
              ...record,
              ...savedRecord,
              favorite: record.favorite || false,
            }
            : record
        )
      );
    } else {
      setRecords([
        {
          ...savedRecord,
          favorite: false,
        },
        ...records,
      ]);
    }

    localStorage.removeItem('sanfrel-log-draft');
    setSavedDraft(null);

    setSaveMessage(
      editingRecordId
        ? '観戦記録を更新しました！'
        : '観戦記録を保存しました！'
    );

    setEditingRecordId(null);
    setDraft(defaultDraft);
    setView('home');
  };

  void todayKey;

  return (
    <div className="min-h-screen bg-[#e9e7ef]">
      <div className="max-w-md mx-auto min-h-screen bg-[#f8f7fb] relative overflow-x-hidden shadow-2xl text-[#171425] pb-20">

        {view === 'home' && (
          <HomeView
            records={records}
            setView={setView}
            savedDraft={savedDraft}
            saveMessage={saveMessage}
            onStartCreate={handleStartCreate}
            onContinueDraft={continueSavedDraft}
            onDeleteDraft={deleteSavedDraft}

            onEdit={handleEditRecord}
            onToggleFavorite={toggleFavorite}
            onOpenDetail={openRecordDetail}

          />
        )}
        {view === 'stats' && <StatsView records={records} setView={setView} />}
        {view === 'mypage' && <MyPageView records={records} setView={setView} profile={profile} />}
        {view === 'records' && (
          <RecordsView
            setView={setView}
            records={records}
            onEdit={handleEditRecord}
            onToggleFavorite={toggleFavorite}
            onOpenDetail={openRecordDetail}
            onDeleteRecords={handleDeleteRecords}
          />
        )}
        {view === 'recordDetail' && selectedRecord && (
          <RecordDetailView
            record={records.find((record) => record.id === selectedRecord.id) || selectedRecord}
            setView={setView}
            backTo={detailBackView}
            onEdit={handleEditRecord}
            onToggleFavorite={toggleFavorite}
            onDelete={handleDeleteRecord}
          />
        )}

        {view === 'profileSettings' && (
          <ProfileSettingsView
            profile={profile}
            setView={setView}
            onSaveProfile={saveProfile} />

        )}
        {view === 'favoriteRecords' && (
          <FavoriteRecordsView
            setView={setView}
            records={records}
            onEdit={handleEditRecord}
            onToggleFavorite={toggleFavorite}
            onOpenDetail={openRecordDetail}
          />
        )}
        {view === 'photoAlbum' && (
          <PhotoAlbumView
            records={records}
            setView={setView}
          />
        )}
        {view === 'badgeCollection' && (
          <BadgeCollectionView
            records={records}
            setView={setView}
          />
        )}
        {view === 'attendanceCalendar' && (
          <AttendanceCalendarView
            records={records}
            setView={setView}
            onOpenDetail={openRecordDetail}
          />
        )}



        {view === 'step1' && (
          <CreateStep1
            setView={setView}
            draft={draft}
            updateDraft={updateDraft}
            onSaveDraft={saveCurrentDraft}
          />
        )}

        {view === 'step2' && (
          <CreateStep2
            setView={setView}
            draft={draft}
            updateDraft={updateDraft}
            records={records}
            onSaveDraft={saveCurrentDraft}
          />
        )}

        {view === 'step3' && (
          <CreateStep3
            setView={setView}
            draft={draft}
            updateDraft={updateDraft}
            onSaveDraft={saveCurrentDraft}
          />
        )}

        {view === 'confirm' && (
          <ConfirmView
            setView={setView}
            draft={draft}
            onSave={handleSave}
            onSaveDraft={saveCurrentDraft}
          />
        )}

        {(view === 'home' || view === 'records' || view === 'stats' || view === 'mypage') && (
          <BottomNav
            setView={setView}
            view={view}
            onStartCreate={handleStartCreate}
          />
        )}

        <StyleHelper />
      </div>
    </div>
  );
}

function BrandHeader({ back, setView = () => { }, records = [] }) {
  const [noticeOpen, setNoticeOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const nextMatch = getNextMatch(records);


  const movePage = (page) => {
    setView(page);
    setMenuOpen(false);
    setNoticeOpen(false);
  };

  return (
    <header className="relative h-[85px] bg-[#210650] text-white z-[60] shadow-lg shadow-purple-900/30 overflow-visible border-b-[3px] border-[#c8a45d]/60">
      {/* 背景グラデーション */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#35106f] via-[#24104d] to-[#160533]"></div>

      {/* うっすら光 */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_42%_42%,rgba(255,255,255,0.16),transparent_22%),radial-gradient(circle_at_82%_70%,rgba(214,179,106,0.13),transparent_14%)]"></div>

      {/* 左の斜め装飾：薄め */}
      <div className="absolute -left-12 top-0 h-full w-20 skew-x-[-28deg] bg-white/8"></div>
      <div className="absolute left-4 top-0 h-full w-1.5 skew-x-[-28deg] bg-[#c8a45d]/28"></div>
      <div className="absolute left-10 top-0 h-full w-14 skew-x-[-28deg] bg-purple-300/8"></div>

      {/* 右の斜め装飾：薄め */}
      <div className="absolute -right-10 top-0 h-full w-24 skew-x-[-30deg] bg-purple-300/8"></div>
      <div className="absolute right-8 top-0 h-full w-1.5 skew-x-[-30deg] bg-[#c8a45d]/28"></div>
      <div className="absolute right-16 top-0 h-full w-px skew-x-[-30deg] bg-white/12"></div>

      {/* 下の金ライン */}
      <div className="absolute left-0 right-0 bottom-0 h-[3px] bg-gradient-to-r from-purple-500 via-[#d6b36a] to-purple-600"></div>
      <div className="absolute left-1/2 bottom-[-5px] h-4 w-24 -translate-x-1/2 rounded-full bg-[#d6b36a]/20 blur-xl"></div>

      <div className="relative z-10 h-full px-5 flex items-center">
        {back && (
          <button
            type="button"
            onClick={() => setView(back)}
            className="absolute left-3 top-3 w-8 h-8 rounded-full bg-white/12 border border-white/20 flex items-center justify-center active:scale-95"
          >
            <ChevronLeft size={21} strokeWidth={2.8} />
          </button>
        )}

        <div className={`w-full flex items-center gap-3 ${back ? 'pl-7' : ''}`}>
          {/* ロゴ文字 */}
          <div className="flex-1 min-w-0">
            <div className="flex items-end gap-3 leading-none whitespace-nowrap">
              <span className="text-[25px] font-black tracking-[-0.1em] text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.35)]">
                SANFRE
              </span>

              <span
                className="text-[25px] italic font-black tracking-[-0.08em] text-[#d6b36a] drop-shadow-[0_4px_10px_rgba(0,0,0,0.35)]"
                style={{ fontFamily: "'Brush Script MT', 'Segoe Script', cursive" }}
              >
                log
              </span>
            </div>

            <div className="mt-2 flex items-center gap-2">
              <div className="h-px w-16 bg-[#d6b36a]/70"></div>
              <div className="text-[#d6b36a] text-[10px] leading-none">✦</div>
              <div className="h-px w-16 bg-[#d6b36a]/70"></div>
            </div>

            <div className="mt-2 text-[8px] font-bold tracking-[0.24em] text-white/80 whitespace-nowrap">
              CAPTURE EVERY MATCH MEMORY
            </div>
          </div>

          {/* 右アイコン */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                setNoticeOpen(!noticeOpen);
                setMenuOpen(false);
              }}
              className="relative w-8 h-8 rounded-full bg-white/8 border border-white/15 flex items-center justify-center active:scale-95"
            >
              <Bell size={20} strokeWidth={2.1} />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#d6b36a]"></span>
            </button>

            <div className="h-8 w-px bg-white/30"></div>

            <button
              type="button"
              onClick={() => {
                setMenuOpen(!menuOpen);
                setNoticeOpen(false);
              }}
              className="w-8 h-8 rounded-full bg-white/8 border border-white/15 flex items-center justify-center active:scale-95"
            >
              <Menu size={22} strokeWidth={2.3} />
            </button>
          </div>
        </div>
      </div>

      {/* お知らせ */}
      {noticeOpen && (
        <div className="absolute right-4 top-[124px] w-[295px] bg-white text-[#171425] rounded-2xl shadow-2xl border border-gray-100 p-4 z-[999]">
          <div className="flex items-center justify-between mb-3">
            <div className="font-black text-[#4b1c89] flex items-center gap-2">
              <Bell size={18} />
              お知らせ
            </div>

            <button
              type="button"
              onClick={() => setNoticeOpen(false)}
              className="text-xs font-black text-gray-400"
            >
              閉じる
            </button>
          </div>

          <div className="space-y-3">
            <button
              type="button"
              onClick={() => {
                setScheduleOpen(true);
                setNoticeOpen(false);
              }}
              className="w-full text-left bg-purple-50 hover:bg-purple-100 transition rounded-2xl p-3 border border-purple-100 active:scale-[0.98]"
            >
              <div className="flex items-center justify-between">
                <div className="text-xs font-black text-[#4b1c89]">
                  次の試合
                </div>
                <ChevronRight size={14} className="text-[#4b1c89]" />
              </div>

              <div className="flex items-center gap-2 mt-1">
                <div className="text-sm font-black">
                  {nextMatch
                    ? `${nextMatch.displayDate} vs ${nextMatch.opponent}`
                    : '次の試合は未定'}
                </div>

                {nextMatch && (
                  <span
                    className={`text-[10px] font-black px-2 py-0.5 rounded-full ${nextMatch.venueType === 'HOME'
                      ? 'bg-purple-100 text-[#4b1c89]'
                      : 'bg-yellow-100 text-yellow-700'
                      }`}
                  >
                    {nextMatch.venueType}
                  </span>
                )}
              </div>

              <div className="text-xs text-gray-500 font-bold mt-1">
                {nextMatch
                  ? `${nextMatch.time} キックオフ / ${nextMatch.stadium.includes('エディオン') ? 'Eピース' : nextMatch.stadium}`
                  : '試合予定を追加してください'}
              </div>
            </button>

            <div className="bg-yellow-50 rounded-2xl p-3 border border-yellow-100">
              <div className="text-xs font-black text-yellow-700">
                記録のヒント
              </div>
              <div className="text-sm font-black mt-1">
                試合後にMVPとメモを残してみよう！
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 三本線メニュー */}
      {menuOpen && (
        <div className="fixed right-4 top-[124px] w-[275px] max-h-[calc(100vh-170px)] overflow-y-auto overscroll-contain bg-white text-[#171425] rounded-2xl shadow-2xl border border-gray-100 p-4 pb-6 z-[999]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xs font-black text-[#4b1c89]">
                SANFRE LOG
              </div>
              <div className="text-lg font-black">
                メニュー
              </div>
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="text-xs font-black text-gray-400"
            >
              閉じる
            </button>
          </div>

          <div className="space-y-2">
            <HeaderMenuItem
              icon={<Home size={18} />}
              label="ホーム"
              onClick={() => movePage('home')}
            />

            <HeaderMenuItem
              icon={<List size={18} />}
              label="記録一覧"
              onClick={() => movePage('records')}
            />

            <HeaderMenuItem
              icon={<Calendar size={18} />}
              label="観戦記録を作成"
              onClick={() => movePage('step1')}
            />

            <HeaderMenuItem
              icon={<Bookmark size={18} />}
              label="お気に入り記録"
              onClick={() => movePage('favoriteRecords')}
            />

            <HeaderMenuItem
              icon={<Calendar size={18} />}
              label="参戦カレンダー"
              onClick={() => movePage('attendanceCalendar')}
            />

            <HeaderMenuItem
              icon={<Medal size={18} />}
              label="バッジコレクション"
              onClick={() => movePage('badgeCollection')}
            />

            <HeaderMenuItem
              icon={<BarChart2 size={18} />}
              label="統計"
              onClick={() => movePage('stats')}
            />

            <HeaderMenuItem
              icon={<User size={18} />}
              label="マイページ"
              onClick={() => movePage('mypage')}
            />

            <HeaderMenuItem
              icon={<Shield size={18} />}
              label="プロフィール設定"
              onClick={() => movePage('profileSettings')}
            />
          </div>
        </div>
      )}

      {scheduleOpen && (
        <MatchScheduleModal
          onClose={() => setScheduleOpen(false)}
          records={records}
        />
      )}
    </header>
  );
}
function HeaderMenuItem({ icon, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center gap-3 bg-[#f8f7fb] hover:bg-purple-50 rounded-2xl p-3 text-left border border-gray-100 transition"
    >
      <div className="w-10 h-10 rounded-xl bg-white text-[#4b1c89] flex items-center justify-center shadow-sm shrink-0">
        {icon}
      </div>

      <div className="flex-1 font-black text-sm text-[#171425]">
        {label}
      </div>

      <ChevronRight size={18} className="text-gray-400" />
    </button>
  );
}
function HomeView({
  records,
  setView,
  savedDraft,
  saveMessage,
  onStartCreate,
  onContinueDraft,
  onDeleteDraft,

  onEdit,
  onToggleFavorite,
  onOpenDetail,
}) {
  const [showAllRecords, setShowAllRecords] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);

  const visibleRecords = showAllRecords ? records : records.slice(0, 3);
  const nextMatch = getNextMatch(records);


  const getResult = (record) => {
    const data = record.draftData || {};
    const homeScore =
      data.homeScore !== undefined
        ? Number(data.homeScore)
        : Number(record.score?.match(/(\d+)\s*-\s*(\d+)/)?.[1] || 0);

    const awayScore =
      data.awayScore !== undefined
        ? Number(data.awayScore)
        : Number(record.score?.match(/(\d+)\s*-\s*(\d+)/)?.[2] || 0);

    if (homeScore > awayScore) return 'WIN';
    if (homeScore === awayScore) return 'DRAW';
    return 'LOSE';
  };


  const winCount = records.filter((record) => getResult(record) === 'WIN').length;

  return (
    <div>
      <section className="relative bg-[#381078] text-white overflow-visible">
        <BrandHeader setView={setView} records={records} />

        {/* メインビジュアル */}
        <div className="relative h-[250px] overflow-hidden">
          <img
            src="https://www.jleague.jp/img/news/2025/11/32339.jpg?_=1760690164"
            className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105"
            alt="stadium"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-[#26095a]/40 via-[#3b1378]/65 to-[#3b1378]/95"></div>
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.08)_0%,transparent_35%,transparent_65%,rgba(250,204,21,0.12)_100%)]"></div>

          <div className="absolute left-5 right-5 top-8">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/15 text-white px-3 py-1.5 rounded-lg text-xs font-black mb-4 shadow-lg">
              <Medal size={14} className="text-yellow-300" />
              FORZA VIOLA ALE'
            </div>

            <h1 className="text-[26px] font-black leading-snug tracking-tight drop-shadow-md">
              今日も、紫の記憶を残そう。
            </h1>

            <p className="mt-4 text-sm text-white/95 font-bold leading-7 drop-shadow-sm">
              サンフレッチェのある日常を、<br />
              あなただけのアルバムに。
            </p>
          </div>
        </div>
      </section>

      {/* 情報カード */}
      <div className="-mt-10 px-3 relative z-30">
        <div className="bg-white rounded-2xl shadow-2xl shadow-purple-950/15 p-4 grid grid-cols-3 divide-x divide-gray-200 border border-white/80">
          <MiniStat icon={<Ticket size={14} />} label="観戦数" value={records.length} unit="試合" />
          <MiniStat icon={<Trophy size={14} />} label="勝利" value={winCount} unit="試合" />
          <div
            onClick={() => setScheduleOpen(true)}
            className="px-3 cursor-pointer active:scale-[0.98] transition"
          >
            <button
              type="button"
              onClick={() => setScheduleOpen(true)}
              className="flex items-center gap-1 text-[#3b1378] text-xs font-black mb-2 active:scale-95"
            >
              <Calendar size={14} className="shrink-0" />
              次の試合
            </button>
            <p className="text-[9px] text-[#4b1c89] font-black mb-1">
              タップでカレンダーを表示
            </p>
            {nextMatch ? (
              <div className="min-w-0">
                <div className="flex items-center gap-1 min-w-0">
                  <div className="text-[12px] font-black whitespace-nowrap">
                    {nextMatch.displayDate}
                  </div>

                  <span
                    className={`text-[7px] font-black px-1.5 py-0.5 rounded-full shrink-0 ${nextMatch.venueType === 'HOME'
                      ? 'bg-purple-100 text-[#4b1c89]'
                      : 'bg-yellow-100 text-yellow-700'
                      }`}
                  >
                    {nextMatch.venueType}
                  </span>
                </div>

                <div className="text-[10px] font-bold mt-1 leading-tight truncate">
                  {nextMatch.time} vs {nextMatch.opponent}
                </div>

                <div className="text-[9px] text-gray-500 mt-1 flex items-center gap-1 min-w-0">
                  <MapPin size={10} className="shrink-0" />
                  <span className="truncate">
                    {nextMatch.stadium.includes('エディオン')
                      ? 'Eピース'
                      : nextMatch.stadium}
                  </span>
                </div>
              </div>
            ) : (
              <>
                <div className="text-sm font-black">未定</div>
                <div className="text-[11px] font-bold mt-1 leading-5">
                  次の試合予定はありません
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {scheduleOpen && (
        <MatchScheduleModal
          onClose={() => setScheduleOpen(false)}
          records={records}
        />
      )}
      {saveMessage && (
        <div className="fixed left-1/2 top-[60px] z-[900] w-full max-w-md -translate-x-1/2 px-5">
          <div className="bg-white/95 backdrop-blur-md border border-purple-100 rounded-2xl shadow-xl shadow-purple-900/20 p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-100 text-[#4b1c89] flex items-center justify-center shrink-0">
              <CheckCircle2 size={22} />
            </div>

            <div>
              <div className="text-sm font-black text-[#171425]">
                {saveMessage}
              </div>
              <div className="text-[11px] text-gray-500 font-bold mt-1">
                ホームに反映されました
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 記録ボタン */}
      {savedDraft && (
        <div className="px-5 mt-5">
          <div className="bg-white rounded-[1.4rem] border border-yellow-200 shadow-sm p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 text-[10px] font-black px-3 py-1 rounded-full">
                  <PenSquare size={12} />
                  下書きがあります
                </div>

                <div className="font-black text-[#171425] mt-3 text-sm">
                  vs {savedDraft.opponent}
                </div>

                <div className="text-xs text-gray-500 font-bold mt-1 flex items-center gap-1">
                  <MapPin size={12} />
                  {savedDraft.stadium}
                </div>

                <div className="text-[11px] text-gray-400 font-bold mt-1">
                  保存日時：{savedDraft.savedAt || '未設定'}
                </div>
              </div>

              <div className="w-20 h-16 rounded-2xl overflow-hidden bg-purple-50 shrink-0">
                <img
                  src={getStadiumImage(savedDraft.stadium)}
                  alt={savedDraft.stadium}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="grid grid-cols-[1fr_auto] gap-2 mt-4">
              <button
                type="button"
                onClick={onContinueDraft}
                className="bg-[#4b1c89] text-white text-xs font-black py-3 rounded-2xl active:scale-95"
              >
                続きを書く
              </button>

              <button
                type="button"
                onClick={onDeleteDraft}
                className="bg-gray-100 text-gray-500 text-xs font-black px-4 rounded-2xl active:scale-95"
              >
                削除
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="px-6 mt-5">
        <button
          onClick={onStartCreate}
          className="interactive-card w-full bg-gradient-to-r from-[#4b1c89] to-[#5d20a8] text-white py-4 rounded-full font-black shadow-xl shadow-purple-900/25 flex items-center justify-center gap-2 active:scale-95 transition"
        >
          <Plus size={18} strokeWidth={3} />
          新たに紫を彩る
        </button>
      </div>

      <section className="px-5 mt-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-black text-lg">最近の観戦記録</h2>
            <p className="text-xs text-gray-500 font-bold mt-1">
              {showAllRecords ? 'すべての記録を表示中' : '最新3件を表示中'}
            </p>

            <p className="text-[11px] text-[#4b1c89] font-black mt-1">
              タップで詳細・編集できます。
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowAllRecords(!showAllRecords)}
            className="interactive-icon text-[#4b1c89] text-xs font-black flex items-center"
          >
            {showAllRecords ? '閉じる' : 'すべて見る'}
            <ChevronRight
              size={15}
              className={showAllRecords ? '-rotate-90' : ''}
            />
          </button>
        </div>

        <div className="space-y-4">
          {visibleRecords.map((record) => {

            const result = getResult(record);

            return (
              <div
                key={record.id}
                onClick={() => onOpenDetail(record, 'home')}
                className="interactive-card relative bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex gap-3 cursor-pointer"
              >
                <img
                  src={getStadiumImage(record.stadium)}
                  alt={record.stadium}
                  className="w-24 h-20 rounded-xl object-cover"
                />

                <div className="flex-1 min-w-0">
                  {/* ★修正：日付の横に結果バッジとお気に入りボタンを回り込ませる構造に変更 */}
                  <div className="flex justify-between items-start gap-2">
                    <div className="text-[11px] text-[#3b1378] font-black">
                      {record.date}
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-black px-2 py-1 rounded-full ${result === 'WIN'
                          ? 'bg-purple-100 text-[#4b1c89]'
                          : result === 'DRAW'
                            ? 'bg-gray-100 text-gray-500'
                            : 'bg-red-50 text-red-500'
                          }`}
                      >
                        {result === 'WIN' ? '勝ち' : result === 'DRAW' ? '引分' : '負け'}
                      </span>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation(); // 詳細画面への遷移を防ぐ
                          onToggleFavorite(record.id);
                        }}
                        className="interactive-icon"
                      >
                        <Bookmark
                          size={19}
                          fill={record.favorite ? '#f6c400' : 'none'}
                          className={record.favorite ? 'text-yellow-400' : 'text-gray-400'}
                          strokeWidth={2.4}
                        />
                      </button>
                    </div>
                  </div>

                  <div className="font-black text-sm leading-snug mt-1">
                    {record.score}
                  </div>

                  {/* ▼▼ 前回抜けてしまっていた後半部分 ▼▼ */}
                  <div className="text-[11px] text-gray-500 mt-1 flex items-center gap-1">
                    <MapPin size={11} /> {record.stadium}
                  </div>

                  <div className="text-[11px] text-gray-500 flex items-center gap-1">
                    <Users size={11} /> {record.companion}
                  </div>

                  <span className="inline-block mt-2 bg-purple-100 text-[#4b1c89] text-[10px] font-black px-3 py-1 rounded-full">
                    #{record.tag}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
function MatchScheduleModal({ onClose, records = [] }) {
  const nextMatch = getNextMatch(records);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const groupedSchedule = matchSchedule.reduce((groups, match) => {
    const monthKey = match.date.slice(0, 7).replace('-', '.');

    if (!groups[monthKey]) {
      groups[monthKey] = [];
    }

    groups[monthKey].push(match);
    return groups;
  }, {});

  return (
    <div
      className="fixed inset-0 z-[1000] bg-black/45 px-5 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm max-h-[82vh] bg-white rounded-[1.8rem] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-[#2b0b63] to-[#4b1c89] text-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] font-black text-yellow-300 tracking-widest">
                MATCH CALENDAR
              </div>

              <div className="text-xl font-black mt-1">
                試合カレンダー
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/15 border border-white/15 text-xs font-black"
            >
              ×
            </button>
          </div>

          <p className="text-xs text-white/80 font-bold mt-2">
            2026/27シーズンの日程を確認できます
          </p>
        </div>

        <div className="p-4 overflow-y-auto max-h-[62vh] space-y-5">
          {Object.entries(groupedSchedule).map(([month, matches]) => (
            <div key={month}>
              <div className="sticky top-0 bg-white/95 backdrop-blur-sm py-2 text-[#4b1c89] text-sm font-black border-b border-purple-100">
                {month}
              </div>

              <div className="space-y-2 mt-2">
                {matches.map((match) => {
                  const matchDate = new Date(match.date);
                  matchDate.setHours(0, 0, 0, 0);

                  const isNextMatch = nextMatch && match.section === nextMatch.section;

                  return (
                    <div
                      key={match.section}
                      className={`rounded-2xl p-3 border ${isNextMatch
                        ? 'bg-purple-50 border-purple-200'
                        : 'bg-[#f8f7fb] border-gray-100'
                        }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-12 h-12 rounded-2xl flex flex-col items-center justify-center shrink-0 ${match.venueType === 'HOME'
                            ? 'bg-[#4b1c89] text-white'
                            : 'bg-yellow-100 text-yellow-700'
                            }`}
                        >
                          <div className="text-[10px] font-black">
                            第{match.section}節
                          </div>
                          <div className="text-[9px] font-black mt-0.5">
                            {match.venueType}
                          </div>
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <div className="text-sm font-black text-[#171425]">
                              {match.displayDate}
                            </div>

                            {isNextMatch && (
                              <span className="bg-[#4b1c89] text-white text-[9px] font-black px-2 py-0.5 rounded-full">
                                NEXT
                              </span>
                            )}
                          </div>

                          <div className="text-sm font-black text-[#171425] mt-1 truncate">
                            vs {match.opponent}
                          </div>



                          <div className="text-xs text-gray-500 font-bold mt-1 flex items-center gap-1 min-w-0">
                            <MapPin size={12} className="shrink-0" />
                            <span className="truncate">
                              {/* ★修正：条件を消して、そのままスタジアム名を表示します */}
                              {match.stadium}
                            </span>
                          </div>

                          <div className="text-[11px] text-gray-400 font-bold mt-1">
                            {match.time} キックオフ
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DetailScorersCard({ scorers }) {
  const goalScorers = scorers || [];

  return (
    <Card>
      <div className="flex items-center gap-2 text-[#4b1c89] font-black mb-4">
        <Trophy size={18} />
        得点者
      </div>

      {goalScorers.length > 0 ? (
        <div className="space-y-2">
          {goalScorers.map((scorer, index) => {
            const player = playerOptions.find((p) => p.name === scorer.player);

            return (
              <div
                key={scorer.id || index}
                className="flex items-center gap-3 bg-[#f8f7fb] border border-gray-100 rounded-2xl p-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[#4b1c89] text-white flex items-center justify-center font-black shrink-0">
                  {player ? player.number : index + 1}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-sm font-black text-[#171425] truncate">
                    {scorer.player || '未入力'}
                  </div>

                  <div className="text-[11px] text-gray-400 font-bold mt-0.5">
                    {scorer.minute ? `${scorer.minute}分` : '時間未入力'}
                    {player ? ` / ${player.position}` : ''}
                  </div>
                </div>

                <div className="text-xs font-black text-[#4b1c89] bg-purple-50 px-2 py-1 rounded-full">
                  GOAL
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="h-20 rounded-2xl bg-gray-50 border border-dashed border-gray-200 flex items-center justify-center text-sm text-gray-400 font-bold">
          得点者は未入力です
        </div>
      )}
    </Card>
  );
}

function RecordDetailView({ record, setView, backTo, onEdit, onToggleFavorite, onDelete }) {
  const data = record.draftData || {};
  const expenses = data.expenses || {};
  const photos = data.photos || [];
  const timeline = data.timeline || [];
  const tags = data.tags || [record.tag].filter(Boolean);
  const seatDetail = [
    data.seat,
    data.seatBlock,
    data.seatRow,
    data.seatNumber ? `${data.seatNumber}番` : '',
  ].filter(Boolean).join(' / ');


  const totalExpense = Object.values(expenses || {}).reduce(
    (sum, value) => sum + moneyToNumber(value),
    0
  );

  const scoreMatch = record.score?.match(/(\d+)\s*-\s*(\d+)/);
  const homeScore = data.homeScore ?? (scoreMatch ? scoreMatch[1] : '-');
  const awayScore = data.awayScore ?? (scoreMatch ? scoreMatch[2] : '-');

  const selectedMvp =
    playerOptions.find((player) => player.name === data.mvp) || null;
  const opponentTeam =
    opponentTeams.find((team) => team.name === record.opponent) ||
    opponentTeams.find((team) => team.name === data.opponent) ||
    {
      name: record.opponent || data.opponent || '対戦相手未入力',
      short: record.opponent || data.opponent || '未入力',
      main: '#6b7280',
      sub: '#e5e7eb',
      stadium: record.stadium || data.stadium || '',
    };

  return (
    <div className="min-h-screen bg-[#f8f7fb] pb-28">
      <BrandHeader back={backTo} setView={setView} />

      <section className="px-5 py-6 space-y-4">
        {/* メインカード */}
        <div className="relative overflow-hidden rounded-[1.8rem] bg-gradient-to-br from-[#2a075f] via-[#4b1c89] to-[#6d28d9] text-white shadow-xl shadow-purple-900/25">
          <img
            src={record.img}
            alt={record.stadium}
            className="absolute inset-0 w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#21054b] via-[#3b1378]/80 to-[#2a075f]/70"></div>

          <div className="relative z-10 p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="text-xs font-black text-yellow-300">
                  MATCH DETAIL
                </div>
                <div className="text-sm font-black text-white/85 mt-1">
                  {record.date}
                </div>
              </div>

              <button
                type="button"
                onClick={() => onToggleFavorite(record.id)}
                className="w-10 h-10 rounded-full bg-white/15 border border-white/20 flex items-center justify-center"
              >
                <Bookmark
                  size={21}
                  fill={record.favorite ? '#f6c400' : 'none'}
                  className={record.favorite ? 'text-yellow-300' : 'text-white'}
                  strokeWidth={2.4}
                />
              </button>
            </div>

            <div className="bg-white/12 backdrop-blur-md rounded-2xl p-4 border border-white/15">
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto flex items-center justify-center">
                    <TeamBadge team={sanfrecceTeam} size="small" />
                  </div>
                  <div className="text-xs font-black mt-2">
                    広島
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-[42px] font-black leading-none tracking-[-0.08em]">
                    {homeScore}
                    <span className="text-white/60 mx-1">-</span>
                    {awayScore}
                  </div>
                  <div className="text-[10px] font-black text-yellow-300 mt-2 tracking-widest">
                    FULL TIME
                  </div>
                </div>

                <div className="text-center min-w-0">
                  <div className="w-12 h-12 mx-auto flex items-center justify-center">
                    <TeamBadge team={opponentTeam} size="small" />
                  </div>
                  <div className="text-xs font-black mt-2 truncate">
                    {opponentTeam.short || record.opponent}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-sm font-black">
              <MapPin size={16} />
              {record.stadium}
            </div>
          </div>
        </div>

        <DetailScorersCard scorers={data.scorers || []} />

        <ConfirmPositionBoard draft={data} />

        {/* 基本情報 */}
        <Card>
          <div className="grid grid-cols-2 gap-3">
            <ConfirmMiniCard
              icon={<Calendar size={16} />}
              label="試合日"
              value={record.date}
            />
            <ConfirmMiniCard
              icon={<Sun size={16} />}
              label="天気"
              value={data.weather || '未入力'}
            />
            <ConfirmMiniCard
              icon={<Users size={16} />}
              label="同行者"
              value={record.companion || '未入力'}
            />
            <ConfirmMiniCard
              icon={<Ticket size={16} />}
              label="座席"
              value={seatDetail || '未入力'}
            />
          </div>
        </Card>

        {/* 満足度・MVP・費用 */}
        <Card>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <div className="text-xs text-gray-500 font-black mb-2">
                満足度
              </div>
              <div className="text-2xl font-black text-[#4b1c89]">
                {data.rating || '-'}
              </div>
              <div className="flex justify-center mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={12}
                    fill={star <= (data.rating || 0) ? '#f6c400' : '#e5e7eb'}
                    className={star <= (data.rating || 0) ? 'text-yellow-400' : 'text-gray-200'}
                  />
                ))}
              </div>
            </div>

            <div className="text-center border-x border-gray-100">
              <div className="text-xs text-gray-500 font-black mb-2">
                MVP
              </div>
              {selectedMvp ? (
                <>
                  <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br from-[#4b1c89] to-[#2a075f] text-white flex flex-col items-center justify-center shadow-md">
                    <div className="text-[9px] font-black text-white/70">No.</div>
                    <div className="text-xl font-black leading-none">
                      {selectedMvp.number}
                    </div>
                  </div>
                  <div className="text-[11px] font-black text-[#4b1c89] mt-2 truncate">
                    {selectedMvp.name}
                  </div>
                </>
              ) : (
                <div className="text-xs text-gray-400 font-bold mt-5">
                  未入力
                </div>
              )}
            </div>

            <div className="text-center">
              <div className="text-xs text-gray-500 font-black mb-2">
                合計費用
              </div>
              <div className="text-xl font-black text-[#4b1c89] leading-tight">
                ¥{totalExpense.toLocaleString()}
              </div>
              <div className="text-[10px] text-gray-400 font-bold mt-1">
                観戦総額
              </div>
            </div>
          </div>
        </Card>

        {/* メモ */}
        <Card>
          <div className="flex items-center gap-2 text-[#4b1c89] font-black mb-3">
            <PenSquare size={17} />
            思い出メモ
          </div>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {data.memo || 'メモはありません'}
          </p>
        </Card>

        {/* タグ */}
        <Card>
          <div className="flex items-center gap-2 text-[#4b1c89] font-black mb-3">
            <TagIcon size={17} />
            タグ
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.length > 0 ? (
              tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-purple-100 text-[#4b1c89] text-xs font-black px-3 py-1.5 rounded-full"
                >
                  #{tag}
                </span>
              ))
            ) : (
              <span className="text-sm text-gray-400 font-bold">タグなし</span>
            )}
          </div>
        </Card>

        {/* 写真 */}
        <Card>
          <div className="flex items-center gap-2 text-[#4b1c89] font-black mb-3">
            <ImageIcon size={17} />
            写真
          </div>

          {photos.length > 0 ? (
            <div className="grid grid-cols-3 gap-3">
              {photos.map((photo) => (
                <img
                  key={photo.id}
                  src={photo.url}
                  alt={photo.name}
                  className="w-full h-24 object-cover rounded-2xl border border-gray-200 shadow-sm"
                />
              ))}
            </div>
          ) : (
            <div className="h-20 rounded-2xl bg-gray-50 border border-dashed border-gray-200 flex items-center justify-center text-sm text-gray-400 font-bold">
              写真はありません
            </div>
          )}
        </Card>

        {/* タイムライン */}
        <Card>
          <div className="flex items-center gap-2 text-[#4b1c89] font-black mb-4">
            <Clock size={17} />
            タイムライン
          </div>

          {timeline.length > 0 ? (
            <div className="relative ml-3 border-l-2 border-[#4b1c89] space-y-4">
              {timeline.map((item) => (
                <div key={item.id} className="relative pl-6">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-[#4b1c89] bg-white"></div>
                  <div className="bg-[#f8f7fb] rounded-2xl p-3 border border-gray-100">
                    <div className="text-xs font-black text-[#4b1c89]">
                      {item.time}
                    </div>
                    <div className="text-sm font-bold mt-1">
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-20 rounded-2xl bg-gray-50 border border-dashed border-gray-200 flex items-center justify-center text-sm text-gray-400 font-bold">
              タイムラインはありません
            </div>
          )}
        </Card>
      </section>

      <BottomAction>
        <button onClick={() => setView(backTo)} className="secondary-btn">
          <ChevronLeft size={20} />
          戻る
        </button>

        <button
          onClick={() => onDelete(record.id)}
          className="bg-red-50 text-red-600 border border-red-100 rounded-2xl py-3 px-4 font-black flex items-center justify-center gap-2 active:scale-95"
        >
          <Trash2 size={18} />
          削除
        </button>

        <button onClick={() => onEdit(record)} className="primary-btn flex-[1.4]">
          <Pencil size={18} />
          編集する
        </button>
      </BottomAction>
    </div>
  );
}

function FavoriteRecordsView({ setView, records, onEdit, onToggleFavorite, onOpenDetail }) {
  const favoriteRecords = records.filter((record) => record.favorite);

  return (
    <div className="min-h-screen bg-[#f8f7fb] pb-24">
      <BrandHeader back="mypage" setView={setView} />

      <section className="px-5 py-6">
        <div className="mb-5">
          <div className="flex items-center gap-2 text-[#4b1c89] font-black text-sm mb-1">
            <Bookmark size={18} fill="currentColor" />
            FAVORITE RECORDS
          </div>

          <h1 className="text-2xl font-black text-[#171425]">
            お気に入り記録
          </h1>

          <p className="text-xs text-gray-500 font-bold mt-1">
            お気に入り登録した観戦記録をまとめて表示
          </p>
        </div>

        {favoriteRecords.length > 0 ? (
          <div className="space-y-4">
            {favoriteRecords.map((record) => (

              // ✨ classNameの中身をスッキリさせました！
              <div
                key={record.id}
                onClick={() => onOpenDetail(record, 'favoriteRecords')}
                className="relative bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex gap-3 cursor-pointer active:scale-[0.99] transition"
              >

                <img
                  src={record.img}
                  alt="record"
                  className="w-24 h-20 rounded-xl object-cover"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <div className="text-[11px] text-[#3b1378] font-black">
                      {record.date}
                    </div>

                    <div className="flex items-center gap-2">


                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(record.id);
                        }}
                        className="interactive-icon"
                      >
                        <Bookmark
                          size={19}
                          fill="#f6c400"
                          className="text-yellow-400"
                          strokeWidth={2.4}
                        />
                      </button>
                    </div>
                  </div>

                  <div className="font-black text-sm leading-snug mt-1">
                    {record.score}
                  </div>

                  <div className="text-[11px] text-gray-500 mt-1 flex items-center gap-1">
                    <MapPin size={11} />
                    {record.stadium}
                  </div>

                  <div className="text-[11px] text-gray-500 flex items-center gap-1">
                    <Users size={11} />
                    {record.companion}
                  </div>

                  <span className="inline-block mt-2 bg-yellow-100 text-yellow-700 text-[10px] font-black px-3 py-1 rounded-full">
                    ★ お気に入り
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[1.8rem] border border-gray-100 p-8 text-center shadow-sm">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-50 text-[#4b1c89] flex items-center justify-center mb-4">
              <Bookmark size={30} />
            </div>

            <div className="text-lg font-black text-[#171425]">
              まだお気に入りがありません
            </div>

            <p className="text-xs text-gray-500 font-bold leading-6 mt-2">
              観戦記録の詳細ページでブックマークを押すと、ここに表示されます。
            </p>

            <button
              type="button"
              // ★ setView('home') を setView('records') に変更しました
              onClick={() => setView('records')}
              className="mt-5 bg-[#4b1c89] text-white text-sm font-black px-5 py-3 rounded-full shadow-lg shadow-purple-900/20"
            >
              記録一覧を見る
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
function RecordsView({
  setView,
  records,
  onEdit,
  onToggleFavorite,
  onOpenDetail,
  onDeleteRecords,
}) {
  const [keyword, setKeyword] = useState('');
  const [venueFilter, setVenueFilter] = useState('ALL');
  const [resultFilter, setResultFilter] = useState('ALL');
  const [favoriteOnly, setFavoriteOnly] = useState(false);
  const [selectMode, setSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  const homeStadium = 'エディオンピースウイング広島';

  const getVenueType = (record) => {
    const venue = record.draftData?.venueType;

    if (venue === 'HOME' || venue === 'ホーム') return 'HOME';
    if (venue === 'AWAY' || venue === 'アウェイ') return 'AWAY';

    return record.stadium === homeStadium ? 'HOME' : 'AWAY';
  };

  const getResult = (record) => {
    const data = record.draftData || {};

    const homeScore =
      data.homeScore !== undefined
        ? Number(data.homeScore)
        : Number(record.score?.match(/(\d+)\s*-\s*(\d+)/)?.[1] || 0);

    const awayScore =
      data.awayScore !== undefined
        ? Number(data.awayScore)
        : Number(record.score?.match(/(\d+)\s*-\s*(\d+)/)?.[2] || 0);

    if (homeScore > awayScore) return 'WIN';
    if (homeScore === awayScore) return 'DRAW';
    return 'LOSE';
  };

  const filteredRecords = records.filter((record) => {
    const searchText = [
      record.opponent,
      record.stadium,
      record.tag,
      record.score,
      record.companion,
      ...(record.draftData?.tags || []),
    ]
      .join(' ')
      .toLowerCase();

    const matchKeyword = searchText.includes(keyword.toLowerCase());
    const matchVenue =
      venueFilter === 'ALL' || getVenueType(record) === venueFilter;
    const matchResult =
      resultFilter === 'ALL' || getResult(record) === resultFilter;
    const matchFavorite = !favoriteOnly || record.favorite;

    return matchKeyword && matchVenue && matchResult && matchFavorite;
  });

  const resetFilters = () => {
    setKeyword('');
    setVenueFilter('ALL');
    setResultFilter('ALL');
    setFavoriteOnly(false);
  };
  const toggleSelectRecord = (id) => {
    const targetId = String(id);

    setSelectedIds((prevIds) =>
      prevIds.includes(targetId)
        ? prevIds.filter((selectedId) => selectedId !== targetId)
        : [...prevIds, targetId]
    );
  };

  const cancelSelectMode = () => {
    setSelectMode(false);
    setSelectedIds([]);
  };

  const deleteSelectedRecords = () => {
    onDeleteRecords(selectedIds);
    cancelSelectMode();
  };

  const selectAllFilteredRecords = () => {
    setSelectedIds(filteredRecords.map((record) => String(record.id)));
  };

  return (
    <div className="min-h-screen bg-[#f8f7fb] pb-24">
      <BrandHeader setView={setView} />

      <div className="px-5 pt-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-2xl font-black text-[#171425]">
              観戦記録一覧
            </h1>

            <p className="text-xs text-gray-500 font-bold mt-1">
              検索・絞り込みで記録を探せます
            </p>


          </div>

          <button
            type="button"
            onClick={() => setView('home')}
            className="text-xs font-black text-[#4b1c89] bg-purple-50 border border-purple-100 px-3 py-2 rounded-full"
          >
            ホームへ
          </button>
        </div>

        {/* 検索・絞り込み */}
        <div className="bg-white rounded-[1.6rem] p-4 border border-gray-100 shadow-sm mb-5">
          <div className="flex items-center gap-2 text-[#4b1c89] font-black mb-3">
            <List size={18} />
            記録を探す
          </div>

          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="対戦相手・スタジアム・タグで検索"
            className="w-full h-12 rounded-2xl bg-[#f8f7fb] border border-gray-200 px-4 text-sm font-bold outline-none focus:border-[#4b1c89]"
          />

          <div className="mt-4">
            <div className="text-xs text-gray-500 font-black mb-2">
              開催地
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'すべて', value: 'ALL' },
                { label: 'HOME', value: 'HOME' },
                { label: 'AWAY', value: 'AWAY' },
              ].map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setVenueFilter(item.value)}
                  className={`py-2 rounded-xl text-xs font-black border ${venueFilter === item.value
                    ? 'bg-[#4b1c89] text-white border-[#4b1c89]'
                    : 'bg-white text-gray-500 border-gray-200'
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <div className="text-xs text-gray-500 font-black mb-2">
              試合結果
            </div>

            <div className="grid grid-cols-4 gap-2">
              {[
                { label: 'すべて', value: 'ALL' },
                { label: '勝ち', value: 'WIN' },
                { label: '引分', value: 'DRAW' },
                { label: '負け', value: 'LOSE' },
              ].map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setResultFilter(item.value)}
                  className={`py-2 rounded-xl text-xs font-black border ${resultFilter === item.value
                    ? 'bg-[#4b1c89] text-white border-[#4b1c89]'
                    : 'bg-white text-gray-500 border-gray-200'
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setFavoriteOnly(!favoriteOnly)}
              className={`flex-1 py-3 rounded-2xl text-xs font-black border flex items-center justify-center gap-2 ${favoriteOnly
                ? 'bg-yellow-300 text-[#3b1378] border-yellow-300'
                : 'bg-white text-gray-500 border-gray-200'
                }`}
            >
              <Bookmark
                size={16}
                fill={favoriteOnly ? 'currentColor' : 'none'}
              />
              お気に入りのみ
            </button>

            <button
              type="button"
              onClick={resetFilters}
              className="px-4 py-3 rounded-2xl text-xs font-black bg-gray-100 text-gray-500"
            >
              リセット
            </button>
          </div>
        </div>

        <div className="mb-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-sm font-black text-[#171425]">
                {filteredRecords.length}件の記録
              </div>

              <p className="text-[11px] text-[#4b1c89] font-black mt-1">
                {selectMode
                  ? '削除したい記録を選択してください。'
                  : 'タップで詳細・編集できます。'}
              </p>
            </div>

            {!selectMode ? (
              <button
                type="button"
                onClick={() => setSelectMode(true)}
                className="text-[11px] font-black text-red-500 bg-red-50 border border-red-100 px-3 py-2 rounded-full"
              >
                選択削除
              </button>
            ) : (
              <button
                type="button"
                onClick={cancelSelectMode}
                className="text-[11px] font-black text-gray-500 bg-gray-100 px-3 py-2 rounded-full"
              >
                キャンセル
              </button>
            )}
          </div>

          {selectMode && (
            <div className="flex items-center gap-2 mt-3">
              <button
                type="button"
                onClick={selectAllFilteredRecords}
                className="text-[11px] font-black text-[#4b1c89] bg-purple-50 border border-purple-100 px-3 py-2 rounded-full"
              >
                表示中をすべて選択
              </button>

              <button
                type="button"
                onClick={deleteSelectedRecords}
                disabled={selectedIds.length === 0}
                className={`text-[11px] font-black px-3 py-2 rounded-full ${selectedIds.length > 0
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 text-gray-400'
                  }`}
              >
                {selectedIds.length}件削除
              </button>
            </div>
          )}
        </div>

        {filteredRecords.length > 0 ? (
          <div className="space-y-4">
            {filteredRecords.map((record) => {
              const venueType = getVenueType(record);
              const result = getResult(record);
              const recordId = String(record.id);
              const isSelected = selectedIds.includes(recordId);

              return (
                <div
                  key={record.id}
                  onClick={() => {
                    if (selectMode) {
                      toggleSelectRecord(record.id);
                      return;
                    }

                    onOpenDetail(record, 'records');
                  }}
                  className={`relativebg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex gap-3 cursor-pointer active:scale-[0.99] transition ${selectMode && isSelected
                    ? 'border-red-300 ring-4 ring-red-100'
                    : 'border-gray-100'
                    }`}
                >


                  <img
                    src={getStadiumImage(record.stadium)}
                    alt={record.stadium}
                    className="w-24 h-20 rounded-xl object-cover"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <div className="text-[11px] text-[#3b1378] font-black">
                        {record.date}
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-black px-2 py-1 rounded-full ${result === 'WIN'
                            ? 'bg-purple-100 text-[#4b1c89]'
                            : result === 'DRAW'
                              ? 'bg-gray-100 text-gray-500'
                              : 'bg-red-50 text-red-500'
                            }`}
                        >
                          {result === 'WIN'
                            ? '勝ち'
                            : result === 'DRAW'
                              ? '引分'
                              : '負け'}
                        </span>



                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleFavorite(record.id);
                          }}
                          className="interactive-icon"
                        >
                          <Bookmark
                            size={19}
                            fill={record.favorite ? '#f6c400' : 'none'}
                            className={record.favorite ? 'text-yellow-400' : 'text-gray-400'}
                            strokeWidth={2.4}
                          />
                        </button>
                      </div>
                    </div>

                    <div className="font-black text-sm leading-snug mt-1">
                      {record.score}
                    </div>

                    <div className="text-[11px] text-gray-500 mt-1 flex items-center gap-1">
                      <MapPin size={11} />
                      {record.stadium}
                    </div>

                    <div className="text-[11px] text-gray-500 flex items-center gap-1">
                      <Users size={11} />
                      {record.companion}
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <span className="bg-purple-100 text-[#4b1c89] text-[10px] font-black px-3 py-1 rounded-full">
                        #{record.tag}
                      </span>

                      <span className="bg-gray-100 text-gray-500 text-[10px] font-black px-3 py-1 rounded-full">
                        {venueType}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-[1.8rem] border border-gray-100 p-8 text-center shadow-sm">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-50 text-[#4b1c89] flex items-center justify-center mb-4">
              <List size={30} />
            </div>

            <div className="text-lg font-black text-[#171425]">
              条件に合う記録がありません
            </div>

            <p className="text-xs text-gray-500 font-bold leading-6 mt-2">
              検索ワードや絞り込み条件を変えてみてください。
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 bg-[#4b1c89] text-white text-sm font-black px-5 py-3 rounded-full shadow-lg shadow-purple-900/20"
            >
              条件をリセット
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
function StatsView({ records, setView }) {
  const homeStadium = 'エディオンピースウイング広島';

  const parseScore = (record) => {
    const draftData = record.draftData || {};

    if (draftData.homeScore !== undefined && draftData.awayScore !== undefined) {
      return {
        home: Number(draftData.homeScore),
        away: Number(draftData.awayScore),
      };
    }

    const match = record.score?.match(/(\d+)\s*-\s*(\d+)/);

    return {
      home: match ? Number(match[1]) : 0,
      away: match ? Number(match[2]) : 0,
    };
  };

  const normalizeVenue = (record) => {
    const venue = record.draftData?.venueType;

    if (venue === 'AWAY' || venue === 'アウェイ') return 'AWAY';
    if (venue === 'HOME' || venue === 'ホーム') return 'HOME';

    return record.stadium === homeStadium ? 'HOME' : 'AWAY';
  };

  const sumExpenses = (expenses = {}) => {
    return Object.values(expenses).reduce((sum, value) => sum + Number(value || 0), 0);
  };

  const countBy = (items) => {
    return items.reduce((acc, item) => {
      if (!item) return acc;
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    }, {});
  };

  const toRanking = (countObject) => {
    return Object.entries(countObject)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);
  };

  const results = records.map((record) => {
    const score = parseScore(record);

    return {
      ...record,
      homeScore: score.home,
      awayScore: score.away,
      venueType: normalizeVenue(record),
      result:
        score.home > score.away
          ? 'win'
          : score.home === score.away
            ? 'draw'
            : 'lose',
    };
  });

  const totalGames = records.length;
  const wins = results.filter((record) => record.result === 'win').length;
  const draws = results.filter((record) => record.result === 'draw').length;
  const losses = results.filter((record) => record.result === 'lose').length;
  const winRate = totalGames > 0 ? ((wins / totalGames) * 100).toFixed(1) : '0.0';

  const homeRecords = results.filter((record) => record.venueType === 'HOME');
  const awayRecords = results.filter((record) => record.venueType === 'AWAY');

  const totalExpense = records.reduce((sum, record) => {
    return sum + sumExpenses(record.draftData?.expenses);
  }, 0);

  const averageExpense = totalGames > 0 ? Math.round(totalExpense / totalGames) : 0;

  const stadiumRanking = toRanking(countBy(records.map((record) => record.stadium)));
  const opponentRanking = toRanking(countBy(records.map((record) => record.opponent)));
  const mvpRanking = toRanking(countBy(records.map((record) => record.draftData?.mvp)));

  const expenseBreakdown = {
    ticket: records.reduce((sum, record) => sum + Number(record.draftData?.expenses?.ticket || 0), 0),
    goods: records.reduce((sum, record) => sum + Number(record.draftData?.expenses?.goods || 0), 0),
    food: records.reduce((sum, record) => sum + Number(record.draftData?.expenses?.food || 0), 0),
    transport: records.reduce((sum, record) => sum + Number(record.draftData?.expenses?.transport || 0), 0),
    other: records.reduce((sum, record) => sum + Number(record.draftData?.expenses?.other || 0), 0),
  };

  return (
    <div className="min-h-screen bg-[#f8f7fb] pb-24">
      <BrandHeader setView={setView} />

      <section className="px-5 py-6">
        <div className="mb-5">
          <div className="flex items-center gap-2 text-[#4b1c89] font-black text-sm mb-1">
            <BarChart2 size={18} />
            観戦データ
          </div>
          <h1 className="text-2xl font-black text-[#171425]">
            統計
          </h1>
          <p className="text-xs text-gray-500 font-bold mt-1">
            あなたの観戦傾向をまとめました
          </p>
        </div>

        {/* メイン統計 */}
        <div className="relative overflow-hidden rounded-[1.8rem] bg-gradient-to-br from-[#2a075f] via-[#4b1c89] to-[#6d28d9] text-white p-5 shadow-xl shadow-purple-900/25 mb-4">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(250,204,21,0.2),transparent_28%)]"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="text-xs text-white/70 font-black">TOTAL MATCHES</div>
                <div className="text-4xl font-black leading-none mt-1">
                  {totalGames}
                  <span className="text-base ml-1">試合</span>
                </div>
              </div>

              <div className="w-20 h-20 rounded-3xl bg-white/10 border border-white/15 flex flex-col items-center justify-center">
                <Trophy size={24} className="text-yellow-300" />
                <div className="text-xs font-black mt-1">勝率</div>
                <div className="text-lg font-black">{winRate}%</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white/10 rounded-2xl p-3 text-center border border-white/10">
                <div className="text-2xl font-black">{wins}</div>
                <div className="text-xs text-white/75 font-bold">勝利</div>
              </div>

              <div className="bg-white/10 rounded-2xl p-3 text-center border border-white/10">
                <div className="text-2xl font-black">{draws}</div>
                <div className="text-xs text-white/75 font-bold">引分</div>
              </div>

              <div className="bg-white/10 rounded-2xl p-3 text-center border border-white/10">
                <div className="text-2xl font-black">{losses}</div>
                <div className="text-xs text-white/75 font-bold">敗戦</div>
              </div>
            </div>
          </div>
        </div>

        {/* HOME / AWAY */}
        <Card>
          <div className="flex items-center gap-2 text-[#4b1c89] font-black mb-4">
            <Flag size={18} />
            HOME / AWAY
          </div>

          <div className="grid grid-cols-2 gap-3">
            <VenueStatCard label="HOME" records={homeRecords} />
            <VenueStatCard label="AWAY" records={awayRecords} />
          </div>
        </Card>

        <div className="h-4"></div>

        {/* 費用 */}
        <Card>
          <div className="flex items-center gap-2 text-[#4b1c89] font-black mb-4">
            <Wallet size={18} />
            観戦費用
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-purple-50 rounded-2xl p-4">
              <div className="text-xs text-gray-500 font-black">合計費用</div>
              <div className="text-2xl font-black text-[#4b1c89] mt-1">
                ¥{totalExpense.toLocaleString()}
              </div>
            </div>

            <div className="bg-purple-50 rounded-2xl p-4">
              <div className="text-xs text-gray-500 font-black">平均費用</div>
              <div className="text-2xl font-black text-[#4b1c89] mt-1">
                ¥{averageExpense.toLocaleString()}
              </div>
            </div>
          </div>

          <ExpenseStatRow label="チケット代" value={expenseBreakdown.ticket} />
          <ExpenseStatRow label="グッズ代" value={expenseBreakdown.goods} />
          <ExpenseStatRow label="ご飯・飲み物代" value={expenseBreakdown.food} />
          <ExpenseStatRow label="交通費" value={expenseBreakdown.transport} />
          <ExpenseStatRow label="その他" value={expenseBreakdown.other} />
        </Card>

        <div className="h-4"></div>

        {/* ランキング */}
        <RankingBlock
          icon={<MapPin size={18} />}
          title="よく行ったスタジアム"
          items={stadiumRanking}
          emptyText="まだスタジアム記録がありません"
        />

        <div className="h-4"></div>

        <RankingBlock
          icon={<Users size={18} />}
          title="対戦相手ランキング"
          items={opponentRanking}
          emptyText="まだ対戦相手の記録がありません"
        />

        <div className="h-4"></div>

        <RankingBlock
          icon={<Star size={18} />}
          title="MVPランキング"
          items={mvpRanking}
          emptyText="MVPが登録された記録がまだありません"
        />
      </section>
    </div>
  );
}

function VenueStatCard({ label, records }) {
  const wins = records.filter((record) => record.result === 'win').length;
  const draws = records.filter((record) => record.result === 'draw').length;
  const losses = records.filter((record) => record.result === 'lose').length;

  return (
    <div className="bg-[#f8f7fb] rounded-2xl p-4 border border-gray-100">
      <div className="text-xs text-gray-500 font-black">{label}</div>
      <div className="text-3xl font-black text-[#4b1c89] mt-1">
        {records.length}
        <span className="text-sm text-gray-500 ml-1">試合</span>
      </div>
      <div className="text-xs font-bold text-gray-500 mt-2">
        {wins}勝 {draws}分 {losses}敗
      </div>
    </div>
  );
}

function ExpenseStatRow({ label, value }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-dashed border-gray-100">
      <div className="text-sm font-bold text-gray-600">{label}</div>
      <div className="text-sm font-black text-[#171425]">
        ¥{Number(value).toLocaleString()}
      </div>
    </div>
  );
}

function RankingBlock({ icon, title, items, emptyText }) {
  return (
    <Card>
      <div className="flex items-center gap-2 text-[#4b1c89] font-black mb-4">
        {icon}
        {title}
      </div>

      {items.length > 0 ? (
        <div className="space-y-3">
          {items.map(([name, count], index) => (
            <div
              key={name}
              className="flex items-center gap-3 bg-[#f8f7fb] rounded-2xl p-3 border border-gray-100"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${index === 0
                  ? 'bg-yellow-300 text-[#3b1378]'
                  : 'bg-purple-100 text-[#4b1c89]'
                  }`}
              >
                {index + 1}
              </div>

              <div className="flex-1 min-w-0">
                <div className="font-black text-sm truncate">{name}</div>
                <div className="text-xs text-gray-500 font-bold mt-0.5">
                  {count}回
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="h-20 rounded-2xl bg-gray-50 border border-dashed border-gray-200 flex items-center justify-center text-sm text-gray-400 font-bold">
          {emptyText}
        </div>
      )}
    </Card>
  );
}
function getSupporterTitle(matchCount) {
  const level = Math.floor(matchCount / 10);

  const titles = [
    'SANFRECCE SUPPORTER',
    '紫の記録者',
    'スタジアムの住人',
    '紫の戦士',
    'スタジアムマスター',
    '勝利の目撃者',
    '紫の戦術家',
    'レジェンドサポーター',
    '紫の永久サポーター',
  ];

  return titles[Math.min(level, titles.length - 1)];
}
const getProfileShieldBadge = (count) => {
  if (count >= 100) {
    return {
      count: 100,
      title: 'LEGEND',
      label: '100',
      bg: 'linear-gradient(135deg, #fef3c7, #ffffff, #a78bfa, #4b1c89)',
      text: '#2a075f',
      border: 'rgba(255,255,255,0.9)',
    };
  }

  if (count >= 50) {
    return {
      count: 50,
      title: 'GOLD',
      label: '50',
      bg: 'linear-gradient(135deg, #fff7ad, #f6c400, #b45309)',
      text: '#3b1378',
      border: 'rgba(255,255,255,0.75)',
    };
  }

  if (count >= 30) {
    return {
      count: 30,
      title: 'SILVER',
      label: '30',
      bg: 'linear-gradient(135deg, #f8fafc, #cbd5e1, #64748b)',
      text: '#1f2937',
      border: 'rgba(255,255,255,0.8)',
    };
  }

  if (count >= 10) {
    return {
      count: 10,
      title: 'BRONZE',
      label: '10',
      bg: 'linear-gradient(135deg, #fed7aa, #c2410c, #7c2d12)',
      text: '#fff7ed',
      border: 'rgba(255,255,255,0.55)',
    };
  }

  return null;
};
function MyPageView({ records, setView, profile }) {
  const supporterTitle = getSupporterTitle(records.length);
  const nextTitleCount = (Math.floor(records.length / 10) + 1) * 10;
  const remainingMatches = nextTitleCount - records.length;
  const favoriteCount = records.filter((record) => record.favorite).length;
  const [showAllAwayRecords, setShowAllAwayRecords] = useState(false);

  const homeStadium = 'エディオンピースウイング広島';

  const getVenueType = (record) => {
    const venue = record.draftData?.venueType;

    if (venue === 'AWAY' || venue === 'アウェイ') return 'AWAY';
    if (venue === 'HOME' || venue === 'ホーム') return 'HOME';

    return record.stadium === homeStadium ? 'HOME' : 'AWAY';
  };

  const awayRecords = records.filter((record) => getVenueType(record) === 'AWAY');

  const visibleAwayRecords = showAllAwayRecords
    ? awayRecords
    : awayRecords.slice(0, 3);

  const totalExpense = records.reduce((sum, record) => {
    const expenses = record.draftData?.expenses || {};
    return (
      sum +
      Number(expenses.ticket || 0) +
      Number(expenses.goods || 0) +
      Number(expenses.food || 0) +
      Number(expenses.transport || 0) +
      Number(expenses.other || 0)
    );
  }, 0);

  const countBy = (items) => {
    return items.reduce((acc, item) => {
      if (!item) return acc;
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    }, {});
  };

  const getTopItem = (items, fallback) => {
    const ranking = Object.entries(countBy(items)).sort((a, b) => b[1] - a[1]);
    return ranking[0]?.[0] || fallback;
  };

  const favoritePlayer = getTopItem(
    records.map((record) => record.draftData?.mvp),
    '未設定' // ✨ ここを「未設定」に変更
  );

  const favoriteStadium = getTopItem(
    records.map((record) => record.stadium),
    '未設定' // ✨ ここを「未設定」に変更
  );

  const latestRecord = records[0];
  const displayName = profile?.name || 'R';
  const displayPhoto = profile?.photo || null;
  const displayFavoritePlayer = profile?.favoritePlayer || '未設定'; // ✨ ここを '未設定' に変更
  const displayFavoriteStadium = profile?.favoriteStadium || '未設定'; // ✨ ここも '未設定' に変更
  const profileShieldBadge = getProfileShieldBadge(records.length);

  const favoritePlayerData =
    playerOptions.find((player) => player.name === displayFavoritePlayer) || null;

  return (
    <div className="min-h-screen bg-[#f8f7fb] pb-24">
      <BrandHeader setView={setView} />

      <section className="px-5 py-6">
        {/* プロフィールカード */}
        <div className="relative overflow-hidden rounded-[1.8rem] bg-gradient-to-br from-[#2a075f] via-[#4b1c89] to-[#6d28d9] text-white p-5 shadow-xl shadow-purple-900/25 mb-5">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(250,204,21,0.22),transparent_28%)]"></div>
          <div className="pointer-events-none absolute -right-10 -bottom-12 w-36 h-36 rounded-full border border-white/10"></div>

          <div className="relative z-10 flex items-center gap-4">
            <div className="w-20 h-20 rounded-3xl bg-white text-[#4b1c89] flex items-center justify-center shadow-xl border-2 border-yellow-300/70 overflow-hidden">
              {displayPhoto ? (
                <img
                  src={displayPhoto}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={38} strokeWidth={2.5} />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="text-xs font-black text-yellow-300 tracking-[0.2em]">
                MY PROFILE
              </div>

              <div className="flex items-center justify-between gap-3 mt-1 w-full min-w-0">
                <h1 className="text-2xl font-black truncate min-w-0">
                  {displayName}さん
                </h1>

                {profileShieldBadge && (
                  <ProfileShieldBadge badge={profileShieldBadge} />
                )}
              </div>

              <div className="inline-flex items-center gap-1 bg-yellow-300 text-[#3b1378] text-xs font-black px-3 py-1 rounded-full mt-2 shadow">
                <Trophy size={13} fill="currentColor" />
                {supporterTitle}
              </div>

              <p className="text-xs text-white/80 font-bold mt-2">
                次の称号まであと {remainingMatches} 試合
              </p>
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-3 gap-3 mt-5">
            <MyPageStat label="観戦数" value={records.length} unit="試合" />
            <MyPageStat label="お気に入り" value={favoriteCount} unit="件" />
            <MyPageStat label="総費用" value={`¥${totalExpense.toLocaleString()}`} unit="" />
          </div>
        </div>

        {/* 推し・よく行く場所 */}
        <Card>
          <div className="flex items-center gap-2 text-[#4b1c89] font-black mb-4">
            <Star size={18} />
            マイデータ
          </div>

          <div className="space-y-3">
            <FavoritePlayerRow
              player={favoritePlayerData}
              fallbackName={displayFavoritePlayer}
            />

            <ProfileInfoRow
              icon={<MapPin size={18} />}
              label="好きなスタジアム"
              value={displayFavoriteStadium}
            />

            <ProfileInfoRow
              icon={<Bookmark size={18} />}
              label="お気に入り記録"
              value={`${favoriteCount}件`}
            />
          </div>
        </Card>

        <div className="h-4"></div>
        {/* 観戦マップ */}
        <StadiumMapSection records={records} />

        <div className="h-4"></div>

        {/* 遠征記録 */}
        <AwayRecordSection records={records} />

        <div className="h-4"></div>

        {/* 最新の観戦記録 */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-[#4b1c89] font-black">
              <Calendar size={18} />
              最新の観戦記録
            </div>

            <button
              type="button"
              onClick={() => setView('home')}
              className="text-xs font-black text-[#4b1c89] flex items-center gap-1"
            >
              ホームへ
              <ChevronRight size={14} />
            </button>
          </div>

          {latestRecord ? (
            <div className="bg-[#f8f7fb] rounded-2xl p-3 border border-gray-100">
              <div className="text-[11px] text-[#4b1c89] font-black">
                {latestRecord.date}
              </div>
              <div className="font-black text-sm mt-1">
                {latestRecord.score}
              </div>
              <div className="text-xs text-gray-500 font-bold mt-2 flex items-center gap-1">
                <MapPin size={12} />
                {latestRecord.stadium}
              </div>
              <span className="inline-block mt-3 bg-purple-100 text-[#4b1c89] text-[10px] font-black px-3 py-1 rounded-full">
                #{latestRecord.tag}
              </span>
            </div>
          ) : (
            <div className="h-24 rounded-2xl bg-gray-50 border border-dashed border-gray-200 flex items-center justify-center text-sm text-gray-400 font-bold">
              まだ観戦記録がありません
            </div>
          )}
        </Card>

        <div className="h-4"></div>

        {/* メニュー */}
        <Card>
          <div className="flex items-center gap-2 text-[#4b1c89] font-black mb-4">
            <Menu size={18} />
            メニュー
          </div>

          <div className="space-y-2">
            <MyPageMenuItem
              icon={<Bookmark size={18} />}
              title="お気に入り記録"
              text="保存したお気に入りを確認"
              onClick={() => setView('favoriteRecords')}
            />

            <MyPageMenuItem
              icon={<ImageIcon size={18} />}
              title="写真アルバム"
              text="観戦写真をまとめて見る"
              onClick={() => setView('photoAlbum')}
            />

            <MyPageMenuItem
              icon={<Medal size={18} />}
              title="バッジコレクション"
              text="観戦で集めたバッジを見る"
              onClick={() => setView('badgeCollection')}
            />
            <MyPageMenuItem
              icon={<Calendar size={18} />}
              title="参戦カレンダー"
              text="行った試合をカレンダーで見る"
              onClick={() => setView('attendanceCalendar')}
            />

            <MyPageMenuItem
              icon={<BarChart2 size={18} />}
              title="統計を見る"
              text="観戦データをチェック"
              onClick={() => setView('stats')}
            />

            <MyPageMenuItem
              icon={<Shield size={18} />}
              title="プロフィール設定"
              text="名前や推し選手を編集"
              onClick={() => setView('profileSettings')}
            />
          </div>
        </Card>
      </section>
    </div>
  );
}

const stadiumMapPoints = [

  { name: 'エディオンピースウイング広島', short: 'Eピース', area: '広島', x: 37, y: 67 },
  { name: 'JFE晴れの国スタジアム', short: '岡山', area: '岡山', x: 42, y: 65 },
  { name: 'ヨドコウ桜スタジアム', short: '大阪', area: '大阪', x: 48, y: 63 },
  { name: 'パナソニック スタジアム 吹田', short: '吹田', area: '大阪', x: 49, y: 61 },
  { name: 'サンガスタジアム by KYOCERA', short: '京都', area: '京都', x: 51, y: 59 },
  { name: 'ノエビアスタジアム神戸', short: '神戸', area: '兵庫', x: 46, y: 64 },
  { name: 'ベスト電器スタジアム', short: '福岡', area: '福岡', x: 19, y: 63 },
  { name: 'PEACE STADIUM Connected by SoftBank', short: '長崎', area: '長崎', x: 15, y: 72 },
  { name: '豊田スタジアム', short: '豊田', area: '愛知', x: 58, y: 55 },
  { name: 'IAIスタジアム日本平', short: '清水', area: '静岡', x: 66, y: 51 },
  { name: '味の素スタジアム', short: '味スタ', area: '東京', x: 76, y: 42 },
  { name: '国立競技場', short: '国立', area: '東京', x: 77, y: 41 },
  { name: '町田GIONスタジアム', short: '町田', area: '東京', x: 74, y: 44 },
  { name: 'Uvanceとどろきスタジアム by Fujitsu', short: '等々力', area: '神奈川', x: 76, y: 45 },
  { name: '日産スタジアム', short: '日産', area: '神奈川', x: 75, y: 47 },
  { name: '埼玉スタジアム2002', short: '埼スタ', area: '埼玉', x: 78, y: 38 },
  { name: 'フクダ電子アリーナ', short: 'フクアリ', area: '千葉', x: 81, y: 45 },
  { name: '三協フロンテア柏スタジアム', short: '柏', area: '千葉', x: 81, y: 40 },
  { name: 'メルカリスタジアム', short: 'カシマ', area: '茨城', x: 85, y: 36 },
  { name: 'ケーズデンキスタジアム水戸', short: '水戸', area: '茨城', x: 83, y: 33 },
];


function StadiumMapSection({ records }) {
  const [selectedStadiumName, setSelectedStadiumName] = useState(null);

  const visitedStadiums = records.reduce((acc, record) => {
    const point = stadiumMapPoints.find((stadium) => stadium.name === record.stadium);
    if (!point) return acc;

    if (!acc[record.stadium]) {
      acc[record.stadium] = {
        ...point,
        count: 0,
        latestDate: record.date,
        records: [],
      };
    }

    acc[record.stadium].count += 1;
    acc[record.stadium].records.push(record);
    return acc;
  }, {});

  const visitedCount = Object.keys(visitedStadiums).length;

  const selectedPoint =
    stadiumMapPoints.find((stadium) => stadium.name === selectedStadiumName) || null;

  const selectedVisit = selectedStadiumName
    ? visitedStadiums[selectedStadiumName]
    : null;

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-[#4b1c89] font-black">
          <MapPin size={18} />
          観戦マップ
        </div>

        <div className="text-xs font-black text-gray-500">
          {visitedCount}スタジアム訪問
        </div>
      </div>

      <p className="text-xs text-gray-500 font-bold mb-4">
        観戦したスタジアムが紫で表示されます。ピンを押すと記録を確認できます。
      </p>

      <div className="relative h-[340px] rounded-[1.8rem] overflow-hidden bg-gradient-to-br from-[#faf7ff] via-white to-[#fffaf0] border border-purple-100">
        {/* タイトル */}
        <div className="absolute left-4 top-4 z-20">
          <div className="text-[10px] font-black text-[#4b1c89] tracking-[0.28em]">
            SANFRE AWAY MAP
          </div>
          <div className="text-sm font-black text-[#171425] mt-1">
            スタジアム遠征記録
          </div>
        </div>

        {/* 凡例 */}
        <div className="absolute right-4 top-4 z-20 bg-white/85 backdrop-blur-sm rounded-2xl px-3 py-2 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 text-[10px] font-black text-gray-500">
            <span className="w-3 h-3 rounded-full bg-[#4b1c89] inline-block border border-yellow-300"></span>
            訪問済み
          </div>
          <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 mt-1">
            <span className="w-3 h-3 rounded-full bg-white inline-block border border-gray-300"></span>
            未訪問
          </div>
        </div>

        {/* 地図 */}
        {/* 地図 */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <filter id="mapShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow
                dx="0"
                dy="1.5"
                stdDeviation="1.4"
                floodColor="#cdbcf0"
                floodOpacity="0.35"
              />
            </filter>
          </defs>

          {/* 北海道 */}
          <path
            d="
      M76 19
      L78 15
      L82 13
      L86 12
      L91 14
      L94 17
      L95 21
      L92 24
      L87 26
      L82 25
      L78 23
      L75 21
      Z
    "
            fill="#efe8fb"
            stroke="#d7c8f3"
            strokeWidth="0.85"
            strokeLinejoin="round"
            filter="url(#mapShadow)"
          />

          {/* 本州 */}
          <path
            d="
      M22 68
      L24 65
      L23 63
      L26 61
      L29 62
      L32 59
      L36 58
      L38 56
      L43 56
      L47 54
      L50 53
      L53 50
      L57 49
      L60 46
      L63 45
      L66 42
      L70 41
      L72 38
      L75 37
      L77 34
      L80 32
      L82 28
      L85 25
      L88 24
      L90 26
      L90 30
      L88 33
      L86 34
      L84 38
      L81 39
      L79 43
      L76 45
      L74 49
      L70 50
      L67 54
      L64 55
      L61 59
      L57 60
      L54 63
      L50 64
      L46 67
      L41 67
      L37 69
      L32 69
      L29 71
      L25 70
      Z
    "
            fill="#efe8fb"
            stroke="#d7c8f3"
            strokeWidth="0.85"
            strokeLinejoin="round"
            filter="url(#mapShadow)"
          />

          {/* 四国 */}
          <path
            d="
      M38 74
      L41 72
      L45 71
      L49 72
      L52 74
      L50 76
      L45 76
      L42 75
      Z
    "
            fill="#efe8fb"
            stroke="#d7c8f3"
            strokeWidth="0.75"
            strokeLinejoin="round"
            filter="url(#mapShadow)"
          />

          {/* 九州 */}
          <path
            d="
      M12 72
      L13 68
      L15 65
      L14 62
      L17 60
      L21 61
      L24 60
      L27 63
      L29 66
      L28 70
      L26 73
      L27 76
      L23 78
      L21 82
      L17 82
      L14 79
      L12 75
      Z
    "
            fill="#efe8fb"
            stroke="#d7c8f3"
            strokeWidth="0.85"
            strokeLinejoin="round"
            filter="url(#mapShadow)"
          />

          {/* 佐渡島っぽい島 */}
          <path
            d="
      M67 36
      L69 34
      L72 35
      L71 38
      L68 39
      Z
    "
            fill="#efe8fb"
            stroke="#d7c8f3"
            strokeWidth="0.55"
            strokeLinejoin="round"
          />

          {/* 淡路島っぽい島 */}
          <path
            d="
      M47 68
      L49 68.5
      L48 70.5
      L46.5 70
      Z
    "
            fill="#efe8fb"
            stroke="#d7c8f3"
            strokeWidth="0.45"
            strokeLinejoin="round"
          />

          {/* 沖縄 */}
          <circle cx="8" cy="88" r="0.8" fill="#efe8fb" stroke="#d7c8f3" strokeWidth="0.4" />
          <circle cx="10.5" cy="90.5" r="0.6" fill="#efe8fb" stroke="#d7c8f3" strokeWidth="0.4" />
          <circle cx="13" cy="92" r="0.45" fill="#efe8fb" stroke="#d7c8f3" strokeWidth="0.35" />

          {/* 薄い内側ライン：地図っぽさ追加 */}
          <path
            d="M30 63 L36 61 L43 59 L50 56 L57 52 L64 48 L71 43 L78 36"
            fill="none"
            stroke="#ded2f5"
            strokeWidth="0.45"
            strokeDasharray="2 2"
            opacity="0.8"
          />

          <path
            d="M30 68 L36 67 L42 66 L49 64 L55 61"
            fill="none"
            stroke="#ded2f5"
            strokeWidth="0.4"
            strokeDasharray="2 2"
            opacity="0.7"
          />
        </svg>

        {/* マーカー */}
        {stadiumMapPoints.map((point) => {
          const visited = visitedStadiums[point.name];
          const isSelected = selectedStadiumName === point.name;

          return (
            <React.Fragment key={point.name}>
              <button
                type="button"
                onClick={() => setSelectedStadiumName(point.name)}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
                style={{ left: `${point.x}%`, top: `${point.y}%` }}
              >
                <div
                  className={`rounded-full border-2 shadow-md flex items-center justify-center font-black transition-all ${visited
                    ? 'w-8 h-8 bg-[#4b1c89] text-white border-yellow-300'
                    : 'w-5 h-5 bg-white text-gray-300 border-gray-300'
                    } ${isSelected ? 'scale-110 ring-4 ring-purple-200' : ''}`}
                >
                  {visited ? visited.count : ''}
                </div>
              </button>

              {(visited || isSelected) && (
                <div
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                  style={{ left: `${point.lx}%`, top: `${point.ly}%` }}
                >
                  <div className="bg-white/95 border border-purple-100 rounded-full px-2.5 py-1 shadow-sm text-[9px] font-black text-[#4b1c89] whitespace-nowrap">
                    {point.short}
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {selectedPoint && (
        <div className="mt-4 bg-[#f8f7fb] rounded-2xl p-4 border border-gray-100">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-xs text-gray-500 font-black">
                選択中のスタジアム
              </div>
              <div className="text-sm font-black text-[#171425] mt-1">
                {selectedPoint.name}
              </div>
              <div className="text-xs text-gray-500 font-bold mt-1">
                {selectedPoint.area}
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <img
                src={getStadiumImage(selectedPoint.name)}
                alt={selectedPoint.name}
                className="w-16 h-12 rounded-xl object-cover shadow-sm border border-white"
              />

              <div className="text-right">
                <div className="text-2xl font-black text-[#4b1c89]">
                  {selectedVisit ? selectedVisit.count : 0}
                </div>

                <div className="text-[10px] text-gray-500 font-bold">
                  回観戦
                </div>
              </div>
            </div>
          </div>

          {selectedVisit?.records?.length > 0 ? (
            <div className="mt-4 space-y-2">
              {selectedVisit.records.slice(0, 3).map((record) => (
                <div
                  key={record.id}
                  className="bg-white rounded-2xl p-3 border border-gray-100"
                >
                  <div className="text-[11px] text-[#4b1c89] font-black">
                    {record.date}
                  </div>
                  <div className="text-sm font-black text-[#171425] mt-1">
                    vs {record.opponent}
                  </div>
                  <div className="text-xs text-gray-500 font-bold mt-1">
                    {record.score}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-3 text-xs text-gray-400 font-bold">
              まだこのスタジアムでの観戦記録はありません。
            </div>
          )}
        </div>
      )}
    </Card>
  );
}

function AwayRecordSection({ records }) {
  const [showAllAwayRecords, setShowAllAwayRecords] = useState(false);

  const homeStadium = 'エディオンピースウイング広島';

  const awayRecords = records.filter((record) => {
    const venue = record.draftData?.venueType;

    if (venue === 'AWAY' || venue === 'アウェイ') return true;
    if (venue === 'HOME' || venue === 'ホーム') return false;

    return record.stadium !== homeStadium;
  });

  const visibleAwayRecords = showAllAwayRecords
    ? awayRecords
    : awayRecords.slice(0, 3);

  const awayStadiumCount = new Set(awayRecords.map((record) => record.stadium)).size;

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-[#4b1c89] font-black">
          <Train size={18} />
          遠征記録
        </div>

        <div className="text-xs font-black text-gray-500">
          {awayRecords.length}試合
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-purple-50 rounded-2xl p-4">
          <div className="text-xs text-gray-500 font-black">遠征試合数</div>
          <div className="text-2xl font-black text-[#4b1c89] mt-1">
            {awayRecords.length}
            <span className="text-sm text-gray-500 ml-1">試合</span>
          </div>
        </div>

        <div className="bg-purple-50 rounded-2xl p-4">
          <div className="text-xs text-gray-500 font-black">訪問スタジアム</div>
          <div className="text-2xl font-black text-[#4b1c89] mt-1">
            {awayStadiumCount}
            <span className="text-sm text-gray-500 ml-1">会場</span>
          </div>
        </div>
      </div>

      {awayRecords.length > 0 ? (
        <>
          <div className="space-y-3">
            {visibleAwayRecords.map((record) => (
              <div
                key={record.id}
                className="bg-[#f8f7fb] rounded-2xl p-3 border border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={record.img || getStadiumImage(record.stadium)}
                    alt={record.stadium || 'away record'}
                    className="w-14 h-14 rounded-2xl object-cover shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] text-[#4b1c89] font-black">
                      {record.date}
                    </div>

                    <div className="text-sm font-black text-[#171425] mt-1 truncate">
                      vs {record.opponent || '対戦相手未入力'}
                    </div>

                    <div className="text-xs text-gray-500 font-bold mt-1 flex items-center gap-1 min-w-0">
                      <MapPin size={12} className="shrink-0" />
                      <span className="truncate">
                        {record.stadium || 'スタジアム未入力'}
                      </span>
                    </div>
                  </div>

                  <div className="bg-[#f3e3b0] text-[#8a6424] rounded-full px-3 py-1 text-[10px] font-black shrink-0">
                    AWAY
                  </div>
                </div>
              </div>
            ))}
          </div>

          {awayRecords.length > 3 && (
            <button
              type="button"
              onClick={() => setShowAllAwayRecords(!showAllAwayRecords)}
              className="w-full mt-4 bg-purple-50 text-[#4b1c89] border border-purple-100 rounded-2xl py-3 text-sm font-black active:scale-[0.98]"
            >
              {showAllAwayRecords ? '3件だけ表示' : '全て見る'}
            </button>
          )}
        </>
      ) : (
        <div className="h-24 rounded-2xl bg-gray-50 border border-dashed border-gray-200 flex items-center justify-center text-sm text-gray-400 font-bold">
          まだ遠征記録がありません
        </div>
      )}
    </Card>
  );
}
function ProfileSettingsView({ profile, setView, onSaveProfile }) {
  const [form, setForm] = useState(profile);

  const stadiumOptions = [
    'エディオンピースウイング広島',
    ...new Set(opponentTeams.map((team) => team.stadium)),
    '国立競技場',
    'ヨドコウ桜スタジアム',
    'ヤマハスタジアム',
    'デンカビッグスワンスタジアム',
  ];

  const updateForm = (updates) => {
    setForm({ ...form, ...updates });
  };

  const handleProfilePhotoChange = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      const resizedPhoto = await resizeImage(file, 600, 0.75);

      updateForm({
        photo: resizedPhoto,
        photoX: 50,
        photoY: 50,
      });
    } catch (error) {
      alert('写真の読み込みに失敗しました。別の写真で試してください。');
    }

    e.target.value = '';
  };

  const removeProfilePhoto = () => {
    updateForm({ photo: null });
  };

  return (
    <div className="min-h-screen bg-[#f8f7fb] pb-28">
      <BrandHeader back="mypage" setView={setView} />

      <section className="px-5 py-6">
        <div className="mb-5">
          <div className="flex items-center gap-2 text-[#4b1c89] font-black text-sm mb-1">
            <Shield size={18} />
            MY PROFILE
          </div>

          <h1 className="text-2xl font-black text-[#171425]">
            プロフィール設定
          </h1>

          <p className="text-xs text-gray-500 font-bold mt-1">
            名前や推し選手を変更できます
          </p>
        </div>

        <Card>
          <div className="space-y-5">
            <InputBlock icon={<ImageIcon size={18} />} label="プロフィール写真">
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 rounded-3xl bg-purple-50 text-[#4b1c89] border-2 border-purple-100 flex items-center justify-center overflow-hidden shrink-0">
                  {form.photo ? (
                    <img
                      src={form.photo}
                      alt="profile preview"
                      className="w-full h-full object-cover"
                      style={{
                        objectPosition: `${form.photoX ?? 50}% ${form.photoY ?? 50}%`,
                      }}
                    />
                  ) : (
                    <User size={40} />
                  )}
                </div>

                <div className="flex-1">
                  <label className="inline-flex items-center justify-center gap-2 bg-[#4b1c89] text-white text-sm font-black px-4 py-3 rounded-2xl shadow-lg shadow-purple-900/20 cursor-pointer active:scale-95">
                    <ImageIcon size={17} />
                    写真を選ぶ
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePhotoChange}
                      className="hidden"
                    />
                  </label>

                  {form.photo && (
                    <button
                      type="button"
                      onClick={removeProfilePhoto}
                      className="block mt-3 text-xs font-black text-red-500"
                    >
                      写真を削除
                    </button>
                  )}

                  <p className="text-[11px] text-gray-500 font-bold mt-3 leading-5">
                    選んだ写真がマイページのプロフィール画像になります。
                  </p>
                </div>
              </div>
              {form.photo && (
                <div className="space-y-3 mt-4">
                  <div>
                    <div className="text-xs font-black text-gray-500 mb-1">
                      横位置
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={form.photoX ?? 50}
                      onChange={(e) => updateForm({ photoX: Number(e.target.value) })}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <div className="text-xs font-black text-gray-500 mb-1">
                      縦位置
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={form.photoY ?? 50}
                      onChange={(e) => updateForm({ photoY: Number(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                </div>
              )}
            </InputBlock>
            <InputBlock icon={<User size={18} />} label="名前">
              <input
                value={form.name}
                onChange={(e) => updateForm({ name: e.target.value })}
                className="field"
                placeholder="名前を入力"
              />
            </InputBlock>

            <InputBlock icon={<Trophy size={18} />} label="推し選手">
              <select
                value={form.favoritePlayer || ''} // ✨ ここを少し変更
                onChange={(e) => updateForm({ favoritePlayer: e.target.value })}
                className="field"
              >
                <option value="">選択してください</option> {/* ✨ これを追加！ */}
                {playerOptions.map((player) => (
                  <option key={player.name} value={player.name}>
                    No.{player.number} {player.name} / {player.position}
                  </option>
                ))}
              </select>
            </InputBlock>

            <InputBlock icon={<MapPin size={18} />} label="好きなスタジアム">
              <select
                value={form.favoriteStadium || ''} // ✨ ここを少し変更
                onChange={(e) => updateForm({ favoriteStadium: e.target.value })}
                className="field"
              >
                <option value="">選択してください</option> {/* ✨ これを追加！ */}
                {stadiumOptions.map((stadium) => (
                  <option key={stadium} value={stadium}>
                    {stadium}
                  </option>
                ))}
              </select>
            </InputBlock>
          </div>
        </Card>

        <div className="h-4"></div>

        <Card>
          <div className="text-xs font-black text-gray-500 mb-3">
            プレビュー
          </div>

          <div className="relative overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-[#2a075f] via-[#4b1c89] to-[#6d28d9] text-white p-4">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-2xl bg-white text-[#4b1c89] flex items-center justify-center border-2 border-yellow-300/70 overflow-hidden">
                {form.photo ? (
                  <img
                    src={form.photo}
                    alt="profile preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={32} />
                )}
              </div>

              <div className="min-w-0">
                <div className="text-xs font-black text-yellow-300 tracking-[0.2em]">
                  MY SUPPORTER PROFILE
                </div>

                <div className="text-xl font-black mt-1">
                  {form.name || 'R'} さん
                </div>

                <div className="text-xs text-white/80 font-bold mt-2 truncate">
                  推し：{form.favoritePlayer}
                </div>

                <div className="text-xs text-white/80 font-bold mt-1 truncate">
                  好きなスタジアム：{form.favoriteStadium}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      <BottomAction>
        <button
          type="button"
          onClick={() => setView('mypage')}
          className="secondary-btn"
        >
          <ChevronLeft size={20} />
          戻る
        </button>

        <button
          type="button"
          onClick={() => onSaveProfile(form)}
          className="primary-btn flex-[1.4]"
        >
          <CheckCircle2 size={18} />
          保存する
        </button>
      </BottomAction>
    </div>
  );
}

function ProfileShieldBadge({ badge }) {
  return (
    <div
      className="w-[72px] h-[78px] shrink-0 rounded-2xl flex flex-col items-center justify-center shadow-lg border border-white/60"
      style={{
        background: badge.bg,
        color: badge.text,
      }}
      title={`${badge.count}試合達成`}
    >
      <div className="w-8 h-8 rounded-xl bg-white/25 flex items-center justify-center mb-1.5">
        <Shield size={100} fill="currentColor" strokeWidth={0} />
      </div>

      <div className="text-[15px] leading-none font-black">
        {badge.label}
      </div>

      <div className="text-[7px] leading-none font-black tracking-widest mt-1 opacity-90">
        {badge.title}
      </div>
    </div>
  );
}
function MyPageStat({ label, value, unit }) {
  // ★追加：吹き出しを表示するかどうかの「状態」を用意します
  const [showTooltip, setShowTooltip] = useState(false);

  const valueStr = String(value);
  const isLong = valueStr.length >= 7;

  // ★追加：枠がタップされた時の処理（省略されている時だけ吹き出しを出す）
  const handleClick = () => {
    if (isLong) {
      setShowTooltip(true);
      // 2.5秒後に自動で吹き出しを消す親切設計！
      setTimeout(() => setShowTooltip(false), 2500);
    }
  };

  return (
    <div
      onClick={handleClick}
      // ★修正：relative を追加し、タップできる感（cursor-pointer と active:scale-95）を出します
      className="relative bg-white/10 border border-white/10 rounded-2xl py-3 px-1.5 text-center min-w-0 flex flex-col justify-center cursor-pointer active:scale-95 transition"
    >
      {/* ★追加：タップされたら、枠の上に全額を書いた黒い吹き出しを表示する */}
      {showTooltip && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#171425] text-white text-xs font-black px-3 py-1.5 rounded-lg whitespace-nowrap z-50 shadow-xl">
          {value}{unit}
          {/* 吹き出しの下の小さな三角形（尻尾） */}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#171425] rotate-45"></div>
        </div>
      )}

      <div className={`${isLong ? 'text-sm' : 'text-lg'} font-black leading-none truncate px-0.5`}>
        {value}
      </div>

      <div className="text-[10px] text-white/75 font-bold mt-1 truncate px-0.5">
        {label}{unit && ` / ${unit}`}
      </div>
    </div>
  );
}
function FavoritePlayerRow({ player, fallbackName }) {
  return (
    <div className="flex items-center gap-3 bg-[#f8f7fb] rounded-2xl p-3 border border-gray-100">
      <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#4b1c89] flex items-center justify-center shrink-0">
        <Trophy size={18} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="text-xs text-gray-500 font-black">
          推し選手
        </div>

        <div className="text-sm font-black text-[#171425] truncate mt-0.5">
          {player ? player.name : fallbackName || '未設定'}
        </div>

        {player && (
          <div className="text-[11px] text-[#4b1c89] font-black mt-1">
            背番号 {player.number} / {player.position}
          </div>
        )}
      </div>

      {player && (
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4b1c89] to-[#2a075f] text-white flex flex-col items-center justify-center shadow-md shrink-0">
          <div className="text-[8px] font-black tracking-widest text-white/75">
            No.
          </div>

          <div className="text-[26px] leading-none font-black">
            {player.number}
          </div>

          <div className="text-[8px] font-black text-yellow-300 mt-0.5">
            {player.position}
          </div>
        </div>
      )}
    </div>
  );
}
function ProfileInfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 bg-[#f8f7fb] rounded-2xl p-3 border border-gray-100">
      <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#4b1c89] flex items-center justify-center shrink-0">
        {icon}
      </div>

      <div className="flex-1 min-w-0">
        <div className="text-xs text-gray-500 font-black">
          {label}
        </div>
        <div className="text-sm font-black text-[#171425] truncate mt-0.5">
          {value}
        </div>
      </div>
    </div>
  );
}

function AttendanceCalendarView({ records, setView, onOpenDetail }) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const toDateKey = (dateText) => {
    if (!dateText) return '';

    return String(dateText)
      .replaceAll('.', '-')
      .slice(0, 10);
  };

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const startBlank = firstDay.getDay();
  const daysInMonth = lastDay.getDate();

  const monthKey = `${year}-${String(month + 1).padStart(2, '0')}`;

  const recordsByDate = records.reduce((map, record) => {
    const key = toDateKey(record.date);

    if (!key) return map;

    if (!map[key]) {
      map[key] = [];
    }

    map[key].push(record);
    return map;
  }, {});

  const monthRecords = records.filter((record) =>
    toDateKey(record.date).startsWith(monthKey)
  );

  const moveMonth = (amount) => {
    setCurrentMonth(new Date(year, month + amount, 1));
  };

  const days = [
    ...Array(startBlank).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className="min-h-screen bg-[#f8f7fb] pb-28">
      <BrandHeader back="mypage" setView={setView} />

      <section className="px-5 py-6">
        <div className="mb-5">
          <div className="flex items-center gap-2 text-[#4b1c89] font-black text-sm mb-1">
            <Calendar size={18} />
            ATTENDANCE CALENDAR
          </div>

          <h1 className="text-2xl font-black text-[#171425]">
            参戦カレンダー
          </h1>

          <p className="text-xs text-gray-500 font-bold mt-1">
            行った試合の日に紫のマークが付きます
          </p>
        </div>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={() => moveMonth(-1)}
              className="w-10 h-10 rounded-full bg-purple-50 text-[#4b1c89] flex items-center justify-center"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="text-lg font-black text-[#171425]">
              {year}年 {month + 1}月
            </div>

            <button
              type="button"
              onClick={() => moveMonth(1)}
              className="w-10 h-10 rounded-full bg-purple-50 text-[#4b1c89] flex items-center justify-center"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="grid grid-cols-7 text-center text-[11px] font-black text-gray-400 mb-2">
            {['日', '月', '火', '水', '木', '金', '土'].map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {days.map((day, index) => {
              if (!day) {
                return <div key={`blank-${index}`} className="h-11" />;
              }

              const dateKey = `${monthKey}-${String(day).padStart(2, '0')}`;
              const dayRecords = recordsByDate[dateKey] || [];
              const hasRecord = dayRecords.length > 0;

              return (
                <button
                  key={dateKey}
                  type="button"
                  onClick={() => {
                    if (hasRecord) {
                      onOpenDetail(dayRecords[0], 'attendanceCalendar');
                    }
                  }}
                  className={`h-11 rounded-2xl text-sm font-black relative flex items-center justify-center ${hasRecord
                    ? 'bg-[#4b1c89] text-white shadow-md shadow-purple-900/20'
                    : 'bg-[#f8f7fb] text-gray-500 border border-gray-100'
                    }`}
                >
                  {day}

                  {hasRecord && (
                    <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-yellow-300"></span>
                  )}
                </button>
              );
            })}
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <div className="font-black text-[#4b1c89]">
              この月の参戦記録
            </div>

            <div className="text-xs text-gray-500 font-black">
              {monthRecords.length}試合
            </div>
          </div>

          {monthRecords.length > 0 ? (
            <div className="space-y-3">
              {monthRecords.map((record) => (
                <button
                  key={record.id}
                  type="button"
                  onClick={() => onOpenDetail(record, 'attendanceCalendar')}
                  className="w-full bg-[#f8f7fb] rounded-2xl p-3 border border-gray-100 text-left flex items-center gap-3"
                >
                  <img
                    src={getStadiumImage(record.stadium)}
                    alt={record.stadium}
                    className="w-16 h-14 rounded-xl object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] text-[#4b1c89] font-black">
                      {record.date}
                    </div>

                    <div className="text-sm font-black text-[#171425] truncate mt-1">
                      vs {record.opponent || '対戦相手未入力'}
                    </div>

                    <div className="text-xs text-gray-500 font-bold mt-1 truncate">
                      {record.stadium || 'スタジアム未入力'}
                    </div>
                  </div>

                  <ChevronRight size={18} className="text-gray-400" />
                </button>
              ))}
            </div>
          ) : (
            <div className="h-24 rounded-2xl bg-gray-50 border border-dashed border-gray-200 flex items-center justify-center text-sm text-gray-400 font-bold">
              この月の参戦記録はありません
            </div>
          )}
        </Card>
      </section>
    </div>
  );
}
const badgeDefinitions = [
  {
    id: 'first-match',
    title: 'はじめての紫',
    description: '初めて観戦記録を作成',
    icon: <Ticket size={24} />,
    condition: (stats) => stats.total >= 1,
    progress: (stats) => `${Math.min(stats.total, 1)}/1`,
  },
  {
    id: 'five-matches',
    title: '紫の常連',
    description: '観戦記録を5試合作成',
    icon: <Calendar size={24} />,
    condition: (stats) => stats.total >= 5,
    progress: (stats) => `${Math.min(stats.total, 5)}/5`,
  },
  {
    id: 'ten-matches',
    title: 'サンフレ生活',
    description: '観戦記録を10試合作成',
    icon: <Medal size={24} />,
    condition: (stats) => stats.total >= 10,
    progress: (stats) => `${Math.min(stats.total, 10)}/10`,
  },
  {
    id: 'home-supporter',
    title: 'ホームの力',
    description: 'ホーム観戦を3試合記録',
    icon: <Building2 size={24} />,
    condition: (stats) => stats.home >= 3,
    progress: (stats) => `${Math.min(stats.home, 3)}/3`,
  },
  {
    id: 'away-trip',
    title: 'アウェイ遠征民',
    description: 'アウェイ観戦を3試合記録',
    icon: <Train size={24} />,
    condition: (stats) => stats.away >= 3,
    progress: (stats) => `${Math.min(stats.away, 3)}/3`,
  },
  {
    id: 'winner',
    title: '勝利の目撃者',
    description: '勝利試合を3試合記録',
    icon: <Trophy size={24} />,
    condition: (stats) => stats.wins >= 3,
    progress: (stats) => `${Math.min(stats.wins, 3)}/3`,
  },
  {
    id: 'photo-memory',
    title: '思い出カメラマン',
    description: '写真付き記録を1試合作成',
    icon: <ImageIcon size={24} />,
    condition: (stats) => stats.photoRecords >= 1,
    progress: (stats) => `${Math.min(stats.photoRecords, 1)}/1`,
  },
  {
    id: 'stadium-traveler',
    title: 'スタジアム巡り',
    description: '3つのスタジアムで観戦',
    icon: <MapPin size={24} />,
    condition: (stats) => stats.stadiums >= 3,
    progress: (stats) => `${Math.min(stats.stadiums, 3)}/3`,
  },
  {
    id: 'perfect-day',
    title: '最高の一日',
    description: '満足度5の試合を記録',
    icon: <Star size={24} />,
    condition: (stats) => stats.fiveStar >= 1,
    progress: (stats) => `${Math.min(stats.fiveStar, 1)}/1`,
  },
  {
    id: 'mvp-watcher',
    title: 'MVP選定員',
    description: 'MVPを3試合で記録',
    icon: <Shield size={24} />,
    condition: (stats) => stats.mvpRecords >= 3,
    progress: (stats) => `${Math.min(stats.mvpRecords, 3)}/3`,
  },
  {
    id: 'twenty-matches',
    title: '熱狂サポーター',
    description: '観戦記録を20試合作成',
    icon: <Medal size={24} />,
    condition: (stats) => stats.total >= 20,
    progress: (stats) => `${Math.min(stats.total, 20)}/20`,
  },
  {
    id: 'thirty-matches',
    title: '紫の民',
    description: '観戦記録を30試合作成',
    icon: <Shield size={24} />,
    condition: (stats) => stats.total >= 30,
    progress: (stats) => `${Math.min(stats.total, 30)}/30`,
  },
  {
    id: 'clean-sheet',
    title: '完封勝利',
    description: '相手を0点に抑えた勝利を記録',
    icon: <Shield size={24} />,
    condition: (stats) => stats.cleanSheet >= 1,
    progress: (stats) => `${Math.min(stats.cleanSheet, 1)}/1`,
  },
  {
    id: 'three-goals',
    title: '大量得点の記憶',
    description: '3得点以上の試合を記録',
    icon: <Trophy size={24} />,
    condition: (stats) => stats.threeGoals >= 1,
    progress: (stats) => `${Math.min(stats.threeGoals, 1)}/1`,
  },
  {
    id: 'draw-memory',
    title: '勝ち点1の記憶',
    description: '引き分け試合を記録',
    icon: <Flag size={24} />,
    condition: (stats) => stats.draws >= 1,
    progress: (stats) => `${Math.min(stats.draws, 1)}/1`,
  },
  {
    id: 'loss-memory',
    title: '悔しさも記録',
    description: '敗戦試合を記録',
    icon: <PenSquare size={24} />,
    condition: (stats) => stats.losses >= 1,
    progress: (stats) => `${Math.min(stats.losses, 1)}/1`,
  },
  {
    id: 'five-stadiums',
    title: '全国スタジアム旅',
    description: '5つのスタジアムで観戦',
    icon: <MapPin size={24} />,
    condition: (stats) => stats.stadiums >= 5,
    progress: (stats) => `${Math.min(stats.stadiums, 5)}/5`,
  },
  {
    id: 'memo-master',
    title: '記録の達人',
    description: 'メモ付き記録を5試合作成',
    icon: <PenSquare size={24} />,
    condition: (stats) => stats.memoRecords >= 5,
    progress: (stats) => `${Math.min(stats.memoRecords, 5)}/5`,
  },
  {
    id: 'goods-buyer',
    title: 'グッズ購入記録',
    description: 'グッズ代を記録',
    icon: <ShoppingBag size={24} />,
    condition: (stats) => stats.goodsRecords >= 1,
    progress: (stats) => `${Math.min(stats.goodsRecords, 1)}/1`,
  },
  {
    id: 'stadium-food',
    title: 'スタグル記録',
    description: '食費を記録',
    icon: <Utensils size={24} />,
    condition: (stats) => stats.foodRecords >= 1,
    progress: (stats) => `${Math.min(stats.foodRecords, 1)}/1`,
  },

  // --- ここから新バッジ10個を追加 ---
  {
    id: 'goddess-of-victory',
    title: '勝利の女神',
    description: '勝率70%以上をキープ（※5試合以上記録）',
    icon: <Star size={24} />,
    condition: (stats) => stats.total >= 5 && stats.winRate >= 70,
    progress: (stats) => stats.total < 5 ? `試合不足(${stats.total}/5)` : `${Math.floor(stats.winRate)}%`,
  },
  {
    id: 'half-century',
    title: 'ハーフセンチュリー',
    description: '観戦記録を50試合作成',
    icon: <Shield size={24} />,
    condition: (stats) => stats.total >= 50,
    progress: (stats) => `${Math.min(stats.total, 50)}/50`,
  },
  {
    id: 'edion-master',
    title: 'エディオンの主',
    description: 'ホーム観戦を10試合記録',
    icon: <Building2 size={24} />,
    condition: (stats) => stats.home >= 10,
    progress: (stats) => `${Math.min(stats.home, 10)}/10`,
  },
  {
    id: 'away-master',
    title: '全国制覇への道',
    description: 'アウェイ観戦を10試合記録',
    icon: <Train size={24} />,
    condition: (stats) => stats.away >= 10,
    progress: (stats) => `${Math.min(stats.away, 10)}/10`,
  },
  {
    id: 'food-maniac',
    title: 'スタグルマニア',
    description: 'スタジアムでのご飯代が累計1万円を突破',
    icon: <Utensils size={24} />,
    condition: (stats) => stats.foodExpenseTotal >= 10000,
    progress: (stats) => `¥${Math.min(stats.foodExpenseTotal, 10000).toLocaleString()}`,
  },
  {
    id: 'highlight-creator',
    title: 'ハイライト職人',
    description: '写真付きの観戦記録を5試合作成',
    icon: <ImageIcon size={24} />,
    condition: (stats) => stats.photoRecords >= 5,
    progress: (stats) => `${Math.min(stats.photoRecords, 5)}/5`,
  },
  {
    id: 'goal-rush',
    title: 'ゴールラッシュ',
    description: '1試合で4得点以上のゴールを記録',
    icon: <Trophy size={24} />,
    condition: (stats) => stats.fourGoals >= 1,
    progress: (stats) => `${Math.min(stats.fourGoals, 1)}/1`,
  },
  {
    id: 'chill-watch',
    title: 'チルな観戦',
    description: '一人での観戦を5試合記録',
    icon: <User size={24} />,
    condition: (stats) => stats.soloGames >= 5,
    progress: (stats) => `${Math.min(stats.soloGames, 5)}/5`,
  },
  {
    id: 'page-of-youth',
    title: '青春の1ページ',
    description: '50文字以上の長文メモを書き残す',
    icon: <PenSquare size={24} />,
    condition: (stats) => stats.longMemoGames >= 1,
    progress: (stats) => `${Math.min(stats.longMemoGames, 1)}/1`,
  },
  {
    id: 'rich-holiday',
    title: '豪遊',
    description: '1試合にかかった総費用が2万円を突破',
    icon: <Wallet size={24} />,
    condition: (stats) => stats.maxExpense >= 20000,
    progress: (stats) => `最高 ¥${stats.maxExpense.toLocaleString()}`,
  },
  // --- ここまで ---
];

const getBadgeStats = (records) => {
  const total = records.length;

  const wins = records.filter((record) => {
    const data = record.draftData || {};
    const scoreMatch = record.score?.match(/(\d+)\s*-\s*(\d+)/);

    const homeScore =
      data.homeScore !== undefined
        ? Number(data.homeScore)
        : Number(scoreMatch?.[1] || 0);

    const awayScore =
      data.awayScore !== undefined
        ? Number(data.awayScore)
        : Number(scoreMatch?.[2] || 0);

    return homeScore > awayScore;
  }).length;

  const home = records.filter((record) => {
    const data = record.draftData || {};
    return data.venueType === 'HOME' || record.stadium?.includes('エディオン');
  }).length;

  const away = records.filter((record) => {
    const data = record.draftData || {};
    return data.venueType === 'AWAY';
  }).length;

  const photoRecords = records.filter((record) => {
    const photos = record.draftData?.photos || [];
    return photos.length > 0;
  }).length;

  const stadiums = new Set(
    records
      .map((record) => record.stadium)
      .filter(Boolean)
  ).size;

  const fiveStar = records.filter((record) => {
    return Number(record.draftData?.rating || 0) === 5;
  }).length;

  const mvpRecords = records.filter((record) => {
    return Boolean(record.draftData?.mvp);
  }).length;

  const cleanSheet = records.filter((record) => {
    const data = record.draftData || {};
    const scoreMatch = record.score?.match(/(\d+)\s*-\s*(\d+)/);

    const homeScore =
      data.homeScore !== undefined
        ? Number(data.homeScore)
        : Number(scoreMatch?.[1] || 0);

    const awayScore =
      data.awayScore !== undefined
        ? Number(data.awayScore)
        : Number(scoreMatch?.[2] || 0);

    return homeScore > awayScore && awayScore === 0;
  }).length;

  const threeGoals = records.filter((record) => {
    const data = record.draftData || {};
    const scoreMatch = record.score?.match(/(\d+)\s*-\s*(\d+)/);

    const homeScore =
      data.homeScore !== undefined
        ? Number(data.homeScore)
        : Number(scoreMatch?.[1] || 0);

    return homeScore >= 3;
  }).length;

  const draws = records.filter((record) => {
    const data = record.draftData || {};
    const scoreMatch = record.score?.match(/(\d+)\s*-\s*(\d+)/);

    const homeScore =
      data.homeScore !== undefined
        ? Number(data.homeScore)
        : Number(scoreMatch?.[1] || 0);

    const awayScore =
      data.awayScore !== undefined
        ? Number(data.awayScore)
        : Number(scoreMatch?.[2] || 0);

    return homeScore === awayScore;
  }).length;

  const losses = records.filter((record) => {
    const data = record.draftData || {};
    const scoreMatch = record.score?.match(/(\d+)\s*-\s*(\d+)/);

    const homeScore =
      data.homeScore !== undefined
        ? Number(data.homeScore)
        : Number(scoreMatch?.[1] || 0);

    const awayScore =
      data.awayScore !== undefined
        ? Number(data.awayScore)
        : Number(scoreMatch?.[2] || 0);

    return homeScore < awayScore;
  }).length;

  const memoRecords = records.filter((record) =>
    Boolean(record.draftData?.memo)
  ).length;

  const goodsRecords = records.filter((record) =>
    moneyToNumber(record.draftData?.expenses?.goods) > 0
  ).length;

  const foodRecords = records.filter((record) =>
    moneyToNumber(record.draftData?.expenses?.food) > 0
  ).length;

  // --- ここから追加する計算式 ---
  // 勝率（5試合以上記録している場合のみ計算、それ以下は0）
  const winRate = total >= 5 ? (wins / total) * 100 : 0;

  // スタグル代（ご飯・飲み物代）の合計
  const foodExpenseTotal = records.reduce((sum, record) => sum + moneyToNumber(record.draftData?.expenses?.food), 0);

  // 4得点以上の試合数
  const fourGoals = records.filter((record) => {
    const data = record.draftData || {};
    const scoreMatch = record.score?.match(/(\d+)\s*-\s*(\d+)/);
    const homeScore = data.homeScore !== undefined ? Number(data.homeScore) : Number(scoreMatch?.[1] || 0);
    return homeScore >= 4;
  }).length;

  // 一人観戦の試合数
  const soloGames = records.filter((record) =>
    record.companion === '一人' || record.companion === '一人で観戦'
  ).length;

  // 50文字以上の長文メモの試合数
  const longMemoGames = records.filter((record) => {
    const memo = record.draftData?.memo || '';
    return memo.length >= 50;
  }).length;

  // 1試合の最高費用
  const maxExpense = records.reduce((max, record) => {
    const ex = record.draftData?.expenses || {};
    const totalEx = moneyToNumber(ex.ticket) + moneyToNumber(ex.goods) + moneyToNumber(ex.food) + moneyToNumber(ex.transport) + moneyToNumber(ex.other);
    return totalEx > max ? totalEx : max;
  }, 0);


  return {
    total,
    wins,
    home,
    away,
    photoRecords,
    stadiums,
    fiveStar,
    mvpRecords,
    cleanSheet,
    threeGoals,
    draws,
    losses,
    memoRecords,
    goodsRecords,
    foodRecords,
    winRate,
    foodExpenseTotal,
    fourGoals,
    soloGames,
    longMemoGames,
    maxExpense,
  };
};

function BadgeCollectionView({ records, setView }) {
  const stats = getBadgeStats(records);

  const unlockedBadges = badgeDefinitions.filter((badge) =>
    badge.condition(stats)
  );

  return (
    <div className="min-h-screen bg-[#f8f7fb] pb-28">
      <BrandHeader back="mypage" setView={setView} />

      <section className="px-5 py-6">
        <div className="mb-5">
          <div className="flex items-center gap-2 text-[#4b1c89] font-black text-sm mb-1">
            <Medal size={18} />
            BADGE COLLECTION
          </div>

          <h1 className="text-2xl font-black text-[#171425]">
            バッジコレクション
          </h1>

          <p className="text-xs text-gray-500 font-bold mt-1">
            観戦記録を増やすとバッジが解放されます
          </p>
        </div>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-500 font-black">
                獲得バッジ
              </div>

              <div className="text-3xl font-black text-[#4b1c89] mt-1">
                {unlockedBadges.length}
                <span className="text-sm text-gray-400 ml-1">
                  / {badgeDefinitions.length}
                </span>
              </div>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4b1c89] to-[#2a075f] text-white flex items-center justify-center shadow-lg shadow-purple-900/20">
              <Medal size={32} />
            </div>
          </div>

          <div className="mt-4 h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#4b1c89] rounded-full"
              style={{
                width: `${(unlockedBadges.length / badgeDefinitions.length) * 100}%`,
              }}
            />
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-3 mt-5">
          {badgeDefinitions.map((badge) => {
            const unlocked = badge.condition(stats);

            return (
              <div
                key={badge.id}
                className={`rounded-2xl p-4 border shadow-sm ${unlocked
                  ? 'bg-white border-purple-100'
                  : 'bg-gray-50 border-gray-100 opacity-60'
                  }`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-3 ${unlocked
                    ? 'bg-gradient-to-br from-[#4b1c89] to-[#2a075f] text-white shadow-md shadow-purple-900/20'
                    : 'bg-gray-200 text-gray-400'
                    }`}
                >
                  {badge.icon}
                </div>

                <div className="text-sm font-black text-[#171425] leading-snug">
                  {badge.title}
                </div>

                <div className="text-[11px] text-gray-500 font-bold mt-1 leading-5">
                  {badge.description}
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span
                    className={`text-[10px] font-black px-2 py-1 rounded-full ${unlocked
                      ? 'bg-purple-100 text-[#4b1c89]'
                      : 'bg-gray-200 text-gray-500'
                      }`}
                  >
                    {unlocked ? '獲得済み' : '未獲得'}
                  </span>

                  <span className="text-[10px] text-gray-400 font-black">
                    {badge.progress(stats)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
function PhotoAlbumView({ records, setView }) {
  // ✨ 1. アルバムと拡大写真を開くための状態を用意
  const [activeAlbum, setActiveAlbum] = useState(null);
  const [activePhotoUrl, setActivePhotoUrl] = useState(null);

  // ✨ 2. 写真が1枚以上ある記録だけを「アルバム」として抽出
  const photoRecords = records.filter((record) =>
    (record.draftData?.photos || []).length > 0
  );

  return (
    <div className="min-h-screen bg-[#f8f7fb] pb-28">
      <BrandHeader back="mypage" setView={setView} />

      <section className="px-5 py-6">
        <div className="mb-5">
          <div className="flex items-center gap-2 text-[#4b1c89] font-black text-sm mb-1">
            <ImageIcon size={18} />
            PHOTO ALBUM
          </div>

          <h1 className="text-2xl font-black text-[#171425]">
            写真アルバム
          </h1>

          <p className="text-xs text-gray-500 font-bold mt-1">
            試合ごとにまとまった写真を見られます
          </p>
        </div>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <div className="font-black text-[#4b1c89]">
              アルバム一覧
            </div>

            <div className="text-xs text-gray-500 font-black">
              {photoRecords.length}試合
            </div>
          </div>

          {photoRecords.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {/* ✨ 3. 試合ごとに表紙（1枚目の写真）を表示 */}
              {photoRecords.map((record) => {
                const photos = record.draftData.photos;
                const firstPhoto = photos[0];

                return (
                  <div
                    key={record.id}
                    onClick={() => setActiveAlbum(record)}
                    className="bg-[#f8f7fb] rounded-2xl overflow-hidden border border-gray-100 shadow-sm cursor-pointer active:scale-95 transition"
                  >
                    <div className="relative">
                      <img
                        src={firstPhoto.url}
                        alt="アルバム表紙"
                        className="w-full h-32 object-cover"
                      />
                      {/* 右下に写真の枚数を表示 */}
                      <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-black px-2 py-1 rounded-lg flex items-center gap-1">
                        <ImageIcon size={12} />
                        {photos.length}
                      </div>
                    </div>

                    <div className="p-3">
                      <div className="text-[11px] text-[#4b1c89] font-black">
                        {record.date}
                      </div>

                      <div className="text-xs font-black text-[#171425] mt-1 truncate">
                        vs {record.opponent || '対戦相手未入力'}
                      </div>

                      <div className="text-[10px] text-gray-500 font-bold mt-1 flex items-center gap-1 min-w-0">
                        <MapPin size={10} className="shrink-0" />
                        <span className="truncate">
                          {record.stadium || 'スタジアム未入力'}
                        </span>
                      </div>

                      {record.tag && (
                        <span className="inline-block mt-2 bg-purple-100 text-[#4b1c89] text-[9px] font-black px-2 py-1 rounded-full">
                          #{record.tag}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="h-40 rounded-2xl bg-gray-50 border border-dashed border-gray-200 flex flex-col items-center justify-center text-center px-4">
              <ImageIcon size={30} className="text-gray-300 mb-2" />
              <div className="text-sm text-gray-400 font-black">
                まだ写真がありません
              </div>
              <div className="text-xs text-gray-400 font-bold mt-1">
                観戦記録を作成するときに写真を追加してみよう
              </div>
            </div>
          )}
        </Card>
      </section>

      {/* ✨ 4. アルバムをタップした時に開く画面（モーダル） */}
      {activeAlbum && (
        <div className="fixed inset-0 z-[1000] bg-[#f8f7fb] flex flex-col">
          {/* アルバムのヘッダー */}
          <div className="h-[70px] px-5 bg-gradient-to-r from-[#2b0b63] to-[#4b1c89] text-white flex items-center justify-between shrink-0 shadow-md">
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-black text-yellow-300">
                {activeAlbum.date}
              </div>
              <div className="text-sm font-black truncate mt-0.5">
                vs {activeAlbum.opponent} の写真
              </div>
            </div>
            <button
              onClick={() => setActiveAlbum(null)}
              className="w-9 h-9 rounded-full bg-white/15 border border-white/15 flex items-center justify-center active:scale-95 shrink-0 ml-3"
            >
              <ChevronLeft size={20} strokeWidth={2.5} />
            </button>
          </div>

          {/* その試合の写真一覧 */}
          <div className="flex-1 overflow-y-auto p-5 pb-20">
            <div className="grid grid-cols-2 gap-3">
              {activeAlbum.draftData.photos.map((photo) => (
                <img
                  key={photo.id}
                  src={photo.url}
                  alt={photo.name}
                  onClick={() => setActivePhotoUrl(photo.url)} // タップでさらに拡大
                  className="w-full h-40 object-cover rounded-2xl shadow-sm border border-gray-200 cursor-pointer active:scale-95 transition"
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ✨ 5. 写真をタップした時の拡大モーダル */}
      {activePhotoUrl && (
        <div
          className="fixed inset-0 bg-black/90 z-[1100] flex flex-col items-center justify-center p-4"
          onClick={() => setActivePhotoUrl(null)}
        >
          <div className="relative max-w-full max-h-full flex flex-col items-center">
            <img
              src={activePhotoUrl}
              alt="拡大写真"
              className="max-w-full max-h-[80vh] rounded-2xl object-contain shadow-2xl border border-white/10"
            />
            <button
              type="button"
              onClick={() => setActivePhotoUrl(null)}
              className="mt-6 bg-white/20 text-white font-black px-6 py-3 rounded-full text-sm backdrop-blur-md"
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
function MyPageMenuItem({ icon, title, text, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center gap-3 bg-[#f8f7fb] rounded-2xl p-3 border border-gray-100 text-left hover:bg-purple-50"
    >
      <div className="w-10 h-10 rounded-xl bg-white text-[#4b1c89] flex items-center justify-center shadow-sm shrink-0">
        {icon}
      </div>

      <div className="flex-1 min-w-0">
        <div className="text-sm font-black text-[#171425]">
          {title}
        </div>
        <div className="text-xs text-gray-500 font-bold mt-0.5">
          {text}
        </div>
      </div>

      <ChevronRight size={18} className="text-gray-400" />
    </button>
  );
}
function MiniStat({ icon, label, value, unit }) {
  return (
    <div className="px-2">
      <div className="flex items-center gap-1 text-[#3b1378] text-xs font-bold mb-2">
        {icon} {label}
      </div>
      <div className="text-3xl font-black text-[#3b1378]">
        {value} <span className="text-xs text-gray-500 font-bold">{unit}</span>
      </div>
    </div>
  );
}

function BottomNav({ setView, view, onStartCreate }) {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white h-16 rounded-t-2xl shadow-[0_-6px_20px_rgba(0,0,0,0.08)] flex items-center justify-around z-50">
      <NavItem
        icon={<Home size={20} fill="currentColor" />}
        label="ホーム"
        active={view === 'home'}
        onClick={() => setView('home')}
      />

      <NavItem
        icon={<List size={20} />}
        label="記録一覧"
        active={view === 'records'}
        onClick={() => setView('records')}
      />

      <button
        type="button"
        onClick={onStartCreate}
        className="relative -top-5 w-16 h-16 rounded-full bg-[#4b1c89] flex items-center justify-center shadow-lg shadow-purple-900/25"
      >
        <div className="w-12 h-12 rounded-full bg-[#4b1c89] text-white flex flex-col items-center justify-center">
          <Calendar size={20} />
          <span className="text-[9px] font-bold">記録する</span>
        </div>
      </button>

      <NavItem
        icon={<BarChart2 size={20} />}
        label="統計"
        active={view === 'stats'}
        onClick={() => setView('stats')}
      />

      <NavItem
        icon={<User size={20} />}
        label="マイページ"
        active={view === 'mypage'}
        onClick={() => setView('mypage')}
      />
    </nav>
  );
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center gap-1 ${active ? 'text-[#4b1c89]' : 'text-gray-500'
        }`}
    >
      {icon}
      <span className="text-[10px] font-bold">{label}</span>
    </button>
  );
}

function CreateShell({ children, setView, backTo, step, onSaveDraft }) {
  return (
    <div className="min-h-screen bg-[#f8f7fb]">
      <BrandHeader back={backTo} setView={setView} />

      <div className="-mt-1 bg-white rounded-t-[2.2rem] min-h-screen px-4 pt-8 pb-40 shadow-[0_-10px_25px_rgba(24,7,55,0.08)]">
        <h1 className="text-center text-[24px] font-black tracking-tight text-[#171425] mb-7">
          観戦記録を作成
        </h1>

        <StepIndicator step={step} />
        {onSaveDraft && (
          <div className="mt-3 flex justify-end">
            <button
              type="button"
              onClick={onSaveDraft}
              className="bg-purple-50 text-[#4b1c89] border border-purple-200 rounded-full px-3 py-2 text-[11px] font-black flex items-center gap-1.5 active:scale-95 shadow-sm"
            >
              <PenSquare size={13} />
              下書き保存
            </button>
          </div>
        )}


        <div className="mt-6">
          {children}
        </div>
      </div>
    </div>
  );
}

function StepIndicator({ step }) {
  const labels = ['試合情報を入力', '思い出を記録', '金額・タイムラインを入力', '確認'];

  return (
    <div className="mb-2">
      <div className="flex items-center justify-between px-8 relative">
        <div className="absolute left-12 right-12 top-4 h-[2px] bg-gray-200"></div>
        <div
          className="absolute left-12 top-4 h-[2px] bg-[#4b1c89] transition-all duration-300"
          style={{
            width:
              step === 1 ? '0%' :
                step === 2 ? '25%' :
                  step === 3 ? '50%' :
                    '75%'
          }}
        ></div>

        {[1, 2, 3, 4].map((num) => (
          <div key={num} className="relative z-10 flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black shadow-sm transition-all ${step >= num
                ? 'bg-[#4b1c89] text-white shadow-purple-900/30'
                : 'bg-white text-gray-400 border-2 border-gray-300'
                }`}
            >
              {num}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-4 text-center mt-3">
        {labels.map((label, i) => (
          <div
            key={label}
            className={`text-[10px] font-black leading-tight ${step === i + 1 ? 'text-[#4b1c89]' : 'text-gray-400'
              }`}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}

function CreateStep1({ setView, draft, updateDraft, onSaveDraft }) {
  const [teamOpen, setTeamOpen] = useState(false);
  const dateInputRef = useRef(null);
  const selectedTeam =
    opponentTeams.find((team) => team.name === draft.opponent) || null;
  const seatGroups = getSeatGroups(draft.stadium, draft.venueType);
  const handleSelectMatch = (sectionValue) => {
    if (!sectionValue) {
      updateDraft({
        matchSection: '',
      });
      return;
    }

    const match = matchSchedule.find(
      (item) => String(item.section) === String(sectionValue)
    );

    if (!match) return;

    updateDraft({
      matchSection: sectionValue,
      tournament: '明治安田J1リーグ',
      date: match.date,
      opponent: match.opponent,
      stadium: match.stadium,
      venueType: match.venueType,
      seat: '',
      seatBlock: '',
      seatRow: '',
      seatNumber: '',
    });

    setTeamOpen(false);
  };

  const homeStadium = 'エディオンピースウイング広島';

  const changeVenueType = (type) => {
    const currentTeam =
      opponentTeams.find((team) => team.name === draft.opponent) ||
      opponentTeams.find((team) => team.name === 'FC東京');

    updateDraft({
      venueType: type,
      stadium: type === 'HOME'
        ? 'エディオンピースウイング広島'
        : currentTeam
          ? currentTeam.stadium
          : '',
      seat: '',
      seatBlock: '',
      seatRow: '',
      seatNumber: '',
    });
  };
  return (
    <CreateShell setView={setView} backTo="home" step={1} onSaveDraft={onSaveDraft}>
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 space-y-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

          {/* 節を選択のブロックのすぐ下、試合日のすぐ上 */}
          <p className="text-[11px] text-gray-500 font-bold mb-2 pl-1 leading-tight">
            ※「節」を選択すると、試合日や対戦相手、スタジアムが自動で反映されます。
          </p>


          <InputBlock icon={<Calendar size={18} />} label="試合日">
            <label className="relative flex items-center justify-between w-full max-w-full box-border border border-gray-200 rounded-2xl bg-white px-4 py-4 overflow-hidden">
              <span
                className={`font-black text-lg ${draft.date ? 'text-[#171425]' : 'text-gray-400'}`}
              >
                {draft.date ? draft.date.replaceAll('-', '/') : '日付を選択'}
              </span>

              <Calendar size={24} className="text-[#4b1c89] shrink-0" />

              <input
                type="date"
                value={draft.date}
                onChange={(e) => updateDraft({ date: e.target.value })}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </label>
          </InputBlock>

          <InputBlock icon={<Trophy size={18} />} label="大会">
            <select className="field">
              <option>明治安田J1リーグ</option>
              <option>ルヴァンカップ</option>
              <option>天皇杯</option>
            </select>
          </InputBlock>
        </div>

        <InputBlock icon={<Flag size={18} />} label="節を選択">
          <select
            value={draft.matchSection || ''}
            onChange={(e) => handleSelectMatch(e.target.value)}
            className="field"
          >
            <option value="">選択してください</option>
            {matchSchedule.map((match) => (
              <option key={match.section} value={match.section}>
                第{match.section}節 {match.displayDate} vs {match.opponent}
              </option>
            ))}
          </select>


        </InputBlock>


        <InputBlock icon={<Users size={18} />} label="対戦カード">
          <div className="border border-gray-200 rounded-2xl p-4 bg-white">
            <div className="flex items-center justify-between gap-3">

              {/* サンフレ側 */}
              <div className="flex-1 text-center">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-[#4b1c89] text-white flex items-center justify-center shadow-md">
                  {/* ↓ strokeWidth={0} と className を右側に合わせる */}
                  <Shield size={30} fill="currentColor" strokeWidth={0} className="text-white" />
                </div>
                <div className="text-xs font-black mt-2 leading-snug">
                  サンフレッチェ広島
                </div>
              </div>

              <div className="px-2">
                <div className="w-10 h-10 rounded-full bg-[#f8f7fb] border border-gray-200 flex items-center justify-center font-black text-[#4b1c89]">
                  VS
                </div>
              </div>

              {/* 相手側 */}
              <button
                type="button"
                onClick={() => setTeamOpen(!teamOpen)}
                className="flex-1 text-center interactive-card rounded-xl p-2 hover:bg-purple-50"
              >
                {selectedTeam ? (
                  <TeamBadge team={selectedTeam} />
                ) : (
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-gray-100 text-gray-400 flex items-center justify-center shadow-sm">
                    <Shield size={30} fill="currentColor" strokeWidth={0} />
                  </div>
                )}

                <div className="text-xs font-black mt-2 leading-snug flex items-center justify-center gap-1">
                  {selectedTeam ? selectedTeam.name : '対戦相手を選択'}
                  <ChevronRight size={14} className="rotate-90 text-[#4b1c89]" />
                </div>
              </button>
            </div>

            {teamOpen && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="text-xs font-black text-gray-500 mb-3">
                  相手チームを選択
                </div>

                <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
                  {opponentTeams.map((team) => (
                    <button
                      key={team.name}
                      type="button"
                      onClick={() => {
                        updateDraft({
                          opponent: team.name,
                          stadium: draft.venueType === 'AWAY'
                            ? team.stadium
                            : 'エディオンピースウイング広島',
                        });
                        setTeamOpen(false);
                      }}
                      className={`h-[58px] flex items-center gap-2 rounded-xl border px-2 py-2 text-left transition ${draft.opponent === team.name
                        ? 'border-[#4b1c89] bg-purple-50'
                        : 'border-gray-200 bg-white hover:bg-gray-50'
                        }`}
                    >
                      <TeamBadge team={team} size="small" />

                      <div className="min-w-0 flex-1 flex flex-col justify-center">
                        <div className="text-[11px] font-black leading-tight truncate">
                          {team.name}
                        </div>
                        <div className="text-[9px] text-gray-500 leading-tight truncate mt-1">
                          {team.stadium}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </InputBlock>
        <InputBlock icon={<MapPin size={18} />} label="開催地">
          <div className="grid grid-cols-2 gap-3">
            {['HOME', 'AWAY'].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => changeVenueType(type)}
                className={`py-3 rounded-xl font-black border transition ${draft.venueType === type
                  ? 'bg-[#4b1c89] text-white border-[#4b1c89] shadow-lg shadow-purple-900/20'
                  : 'bg-white text-[#4b1c89] border-gray-200 hover:bg-purple-50'
                  }`}
              >
                {type === 'HOME' ? 'HOME' : 'AWAY'}
              </button>
            ))}
          </div>
        </InputBlock>
        <InputBlock icon={<Flag size={18} />} label="スコア">
          <div className="flex justify-center items-center gap-10">
            <input
              type="number"
              value={draft.homeScore}
              onChange={(e) => updateDraft({ homeScore: e.target.value })}
              className="w-24 h-16 border border-gray-200 rounded-xl text-center text-3xl font-black text-[#4b1c89] flex items-center justify-center leading-none pt-1"
            />
            <span className="font-black">-</span>
            <input
              type="number"
              value={draft.awayScore}
              onChange={(e) => updateDraft({ awayScore: e.target.value })}
              className="w-24 h-16 border border-gray-200 rounded-xl text-center text-3xl font-black text-[#4b1c89] flex items-center justify-center leading-none pt-1"
            />
          </div>
        </InputBlock>

        <InputBlock icon={<Building2 size={18} />} label="スタジアム">
          <div className="relative">
            <MapPin
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4b1c89] pointer-events-none z-10"
            />
            <select
              value={draft.stadium}
              onChange={(e) => updateDraft({ stadium: e.target.value })}
              className="field"
              style={{ paddingLeft: '52px' }}
            >
              <option>エディオンピースウイング広島</option>

              {/* 北から順 */}


              <option>ケーズデンキスタジアム水戸</option>
              <option>メルカリスタジアム</option>
              <option>三協フロンテア柏スタジアム</option>
              <option>フクダ電子アリーナ</option>
              <option>埼玉スタジアム2002</option>
              <option>味の素スタジアム</option>
              <option>国立競技場</option>
              <option>町田GIONスタジアム</option>
              <option>Uvanceとどろきスタジアム by Fujitsu</option>
              <option>日産スタジアム</option>
              <option>IAIスタジアム日本平</option>
              <option>豊田スタジアム</option>
              <option>サンガスタジアム by KYOCERA</option>
              <option>パナソニック スタジアム 吹田</option>
              <option>ノエビアスタジアム神戸</option>
              <option>ベスト電器スタジアム</option>
              <option>JFE晴れの国スタジアム</option>
              <option>PEACE STADIUM Connected by SoftBank</option>

              {/* 予備・よく使う会場 */}
              <option>ヨドコウ桜スタジアム</option>
              <option>ヤマハスタジアム</option>
              <option>デンカビッグスワンスタジアム</option>
            </select>
          </div>
        </InputBlock>


        <InputBlock icon={<Ticket size={18} />} label="座席">
          <select
            value={draft.seat || ''}
            onChange={(e) => updateDraft({ seat: e.target.value })}
            className="field"
          >
            <option value="">選択してください</option>

            {seatGroups.map((group) => (
              <optgroup key={group.label} label={group.label}>
                {group.seats.map((seat) => (
                  <option key={seat} value={seat}>
                    {seat}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </InputBlock>

        <div className="grid grid-cols-3 gap-2">
          <InputBlock icon={<Building2 size={18} />} label="ブロック">
            <input
              type="text"
              value={draft.seatBlock || ''}
              onChange={(e) => updateDraft({ seatBlock: e.target.value })}
              placeholder="例：B12"
              className="field"
            />
          </InputBlock>

          <InputBlock icon={<List size={18} />} label="列">
            <input
              type="text"
              value={draft.seatRow || ''}
              onChange={(e) => updateDraft({ seatRow: e.target.value })}
              placeholder="例：8列"
              className="field"
            />
          </InputBlock>

          <InputBlock icon={<Ticket size={18} />} label="番号">
            <input
              type="text"
              inputMode="numeric"
              value={draft.seatNumber || ''}
              onChange={(e) => updateDraft({ seatNumber: e.target.value })}
              placeholder="例：24"
              className="field"
            />
          </InputBlock>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <InputBlock icon={<Sun size={18} />} label="天気">
            <select
              value={draft.weather}
              onChange={(e) => updateDraft({ weather: e.target.value })}
              className="field"
            >
              <option value="">選択してください</option>
              <option value="晴れ">晴れ ☀️</option>
              <option value="曇り">曇り ☁️</option>
              <option value="雨">雨 ☔</option>

            </select>
          </InputBlock>

          <InputBlock icon={<Users size={18} />} label="誰と観戦した？">
            <select value={draft.companion} onChange={(e) => updateDraft({ companion: e.target.value })} className="field">
              <option value="">選択してください</option>
              <option>友達</option>
              <option>家族</option>
              <option>一人</option>
            </select>
          </InputBlock>
        </div>
      </div>

      <BottomAction>
        <button onClick={() => setView('home')} className="secondary-btn">
          <ChevronLeft size={20} />
          戻る
        </button>

        <button onClick={() => setView('step2')} className="primary-btn flex-[1.4]">
          次へ <ChevronRight size={22} />
        </button>
      </BottomAction>

      <StyleHelper />
    </CreateShell>
  );
}

function CreateStep2({ setView, draft, updateDraft, records = [], onSaveDraft }) {
  const [tagInput, setTagInput] = useState('');

  const selectedMvp =
    playerOptions.find((player) => player.name === draft.mvp) || null;

  const opponentTeam =
    opponentTeams.find((team) => team.name === draft.opponent) ||
    opponentTeams.find((team) => team.name === 'FC東京');

  const addTag = () => {
    const newTag = tagInput.trim();

    if (!newTag) return;
    if ((draft.tags || []).includes(newTag)) return;

    updateDraft({
      tags: [...(draft.tags || []), newTag],
    });

    setTagInput('');
  };

  const removeTag = (tag) => {
    updateDraft({
      tags: (draft.tags || []).filter((t) => t !== tag),
    });
  };

  const ratingMessages = {
    1: '悔しすぎる',
    2: '次に期待！',
    3: '楽しめた',
    4: 'かなり満足！',
    5: '最高すぎた！',
  };

  const handlePhotoAdd = async (e) => {
    const files = Array.from(e.target.files || []);
    const currentPhotos = draft.photos || [];
    const remaining = 10 - currentPhotos.length;

    if (remaining <= 0) return;

    // 画像を圧縮して読み込む関数に変更
    const processPhoto = async (file) => {
      try {
        // resizeImage(ファイル, 最大ピクセル数, 画質)
        // ここでは長辺最大800px、画質70%で圧縮します
        const compressedUrl = await resizeImage(file, 800, 0.7);
        return {
          id: `${file.name}-${Date.now()}-${Math.random()}`,
          name: file.name,
          url: compressedUrl,
        };
      } catch (error) {
        console.error('写真の圧縮に失敗しました:', error);
        return null;
      }
    };

    // 選択された画像をすべて圧縮処理にかける
    const processedPhotos = await Promise.all(
      files.slice(0, remaining).map(processPhoto)
    );

    // 圧縮に成功したもの（null以外）だけを抽出して追加
    const validNewPhotos = processedPhotos.filter((photo) => photo !== null);

    updateDraft({
      photos: [...currentPhotos, ...validNewPhotos],
    });

    e.target.value = '';
  };

  const removePhoto = (id) => {
    updateDraft({
      photos: (draft.photos || []).filter((photo) => photo.id !== id),
    });
  };

  return (
    <CreateShell setView={setView} backTo="step1" step={2} onSaveDraft={onSaveDraft}>
      <div className="space-y-4">
        {/* 満足度 */}
        <Card>
          <div className="flex items-center gap-2 text-[#4b1c89] font-black mb-4">
            <Star size={18} fill="currentColor" /> 満足度を教えてください
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => updateDraft({ rating: star })}
                  className="interactive-icon"
                >
                  <Star
                    size={36}
                    fill={star <= draft.rating ? '#f6c400' : '#e5e7eb'}
                    className={star <= draft.rating ? 'text-yellow-400' : 'text-gray-200'}
                  />
                </button>
              ))}
            </div>

            <div className="text-left ml-2">
              <div className="text-[38px] leading-none font-black text-[#171425] drop-shadow-sm tracking-[-0.04em]">
                {draft.rating ? `${draft.rating}.0` : '-'}
              </div>

              <div className="text-[11px] text-[#4b1c89] font-black mt-2 max-w-[120px] leading-snug">
                {draft.rating
                  ? ratingMessages[draft.rating]
                  : 'タップして満足度を選択'}
              </div>
            </div>
          </div>
        </Card>



        {/* 今日のMVP */}
        <Card>
          <div className="flex items-center gap-2 text-[#4b1c89] font-black mb-4">
            <Trophy size={18} fill="currentColor" />
            今日のMVP
          </div>

          <div className="flex items-center gap-4">
            {selectedMvp ? (
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#4b1c89] to-[#2a075f] text-white flex flex-col items-center justify-center shadow-md shrink-0">
                <div className="text-[10px] font-black tracking-widest text-white/80">
                  No.
                </div>
                <div className="text-[34px] leading-none font-black">
                  {selectedMvp.number}
                </div>
                <div className="text-[10px] font-black text-yellow-300 mt-1">
                  {selectedMvp.position}
                </div>
              </div>
            ) : (
              <div className="w-20 h-20 rounded-2xl bg-gray-100 text-gray-400 flex items-center justify-center font-black shrink-0">
                未選択
              </div>
            )}

            <div className="flex-1 min-w-0">
              <div className="text-xs text-gray-500 font-black mb-1">
                この試合で一番印象に残った選手
              </div>

              <select
                value={draft.mvp}
                onChange={(e) => updateDraft({ mvp: e.target.value })}
                className="w-full border border-gray-200 rounded-xl p-3 font-black text-[#171425] outline-none focus:border-[#4b1c89] focus:ring-4 focus:ring-purple-100 bg-white"
              >
                <option value="">選択してください</option>
                {playerOptions.map((player) => (
                  <option key={player.name} value={player.name}>
                    #{player.number} {player.name} / {player.position}
                  </option>
                ))}
              </select>

              {selectedMvp ? (
                <>
                  <div className="mt-2 text-sm font-black text-[#4b1c89]">
                    {selectedMvp.name}
                  </div>
                  <div className="text-xs text-gray-500 font-bold">
                    背番号 {selectedMvp.number} / {selectedMvp.position}
                  </div>
                </>
              ) : (
                <div className="mt-2 text-xs text-gray-400 font-bold">
                  まだMVPは選ばれていません
                </div>
              )}
            </div>
          </div>
        </Card>
        <SimplePositionBoard
          draft={draft}
          updateDraft={updateDraft}
          records={records}
        />

        <ScorersCard
          draft={draft}
          updateDraft={updateDraft}
        />

        {/* 思い出メモ */}
        <Card>
          <div className="flex items-center gap-2 text-[#4b1c89] font-black mb-3">
            <PenSquare size={17} /> 思い出メモ
          </div>

          <textarea
            value={draft.memo}
            onChange={(e) => updateDraft({ memo: e.target.value })}
            className="w-full h-36 outline-none resize-none text-sm leading-relaxed border border-gray-200 rounded-2xl p-4 focus:border-[#4b1c89] focus:ring-4 focus:ring-purple-100"
            placeholder="試合の感想、印象に残ったプレー、スタジアムの雰囲気など..."
          />

          <div className="text-right text-xs text-gray-400 font-bold mt-2">
            {draft.memo.length}/300
          </div>
        </Card>

        {/* タグ */}
        <Card>
          <div className="flex items-center gap-2 text-[#4b1c89] font-black mb-4">
            <TagIcon size={18} />
            タグを追加
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            {(draft.tags || []).map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => removeTag(tag)}
                className="border border-[#4b1c89] text-[#4b1c89] rounded-full px-3 py-1.5 text-xs font-black"
              >
                #{tag} ×
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addTag();
                }
              }}
              placeholder="例：逆転勝利"
              className="field flex-1"
            />

            <button
              type="button"
              onClick={addTag}
              className="bg-[#4b1c89] text-white px-4 rounded-2xl text-xs font-black"
            >
              追加
            </button>
          </div>
        </Card>

        {/* 写真 */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-[#4b1c89] font-black">
              <ImageIcon size={18} />
              写真を追加
            </div>
            <div className="text-xs text-gray-500 font-black">
              {(draft.photos || []).length}/10枚
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {(draft.photos || []).map((photo) => (
              <div key={photo.id} className="relative group">
                <img
                  src={photo.url}
                  alt={photo.name}
                  className="w-full h-24 object-cover rounded-2xl border border-gray-200 shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => removePhoto(photo.id)}
                  className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center shadow-md"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}

            {(draft.photos || []).length < 10 && (
              <label className="h-24 rounded-2xl border-2 border-dashed border-purple-200 bg-purple-50/50 text-[#4b1c89] flex flex-col items-center justify-center font-black cursor-pointer hover:bg-purple-100 transition">
                <Plus size={24} />
                <span className="text-xs mt-1">写真追加</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoAdd}
                  className="hidden"
                />
              </label>
            )}
          </div>

          <p className="text-[11px] text-gray-500 font-bold mt-3">
            観戦中に撮った写真を最大10枚まで追加できます。
          </p>
        </Card>
      </div>

      <BottomAction>
        <button onClick={() => setView('step1')} className="secondary-btn">
          <ChevronLeft size={20} /> 戻る
        </button>
        <button onClick={() => setView('step3')} className="primary-btn flex-[1.4]">
          次へ <ChevronRight size={22} />
        </button>
      </BottomAction>
    </CreateShell>
  );
}

function ScorersCard({ draft, updateDraft }) {
  const scorers = draft.scorers || [];

  const addScorer = () => {
    updateDraft({
      scorers: [
        ...scorers,
        {
          id: Date.now(),
          player: '',
          minute: '',
        },
      ],
    });
  };

  const updateScorer = (id, updates) => {
    updateDraft({
      scorers: scorers.map((scorer) =>
        scorer.id === id ? { ...scorer, ...updates } : scorer
      ),
    });
  };

  const removeScorer = (id) => {
    updateDraft({
      scorers: scorers.filter((scorer) => scorer.id !== id),
    });
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-[#4b1c89] font-black">
          <Trophy size={18} />
          得点者
        </div>

        <button
          type="button"
          onClick={addScorer}
          className="text-xs font-black text-[#4b1c89] bg-purple-50 border border-purple-100 px-3 py-2 rounded-full active:scale-95"
        >
          追加
        </button>
      </div>

      {scorers.length === 0 ? (
        <div className="h-20 rounded-2xl bg-gray-50 border border-dashed border-gray-200 flex items-center justify-center text-sm text-gray-400 font-bold">
          得点者は未入力です
        </div>
      ) : (
        <div className="space-y-3">
          {scorers.map((scorer, index) => (
            <div
              key={scorer.id}
              className="bg-[#f8f7fb] border border-gray-100 rounded-2xl p-3"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-xl bg-[#4b1c89] text-white flex items-center justify-center text-xs font-black shrink-0">
                  {index + 1}
                </div>

                <div className="flex-1 font-black text-sm text-[#171425]">
                  ゴール記録
                </div>

                <button
                  type="button"
                  onClick={() => removeScorer(scorer.id)}
                  className="text-red-500"
                >
                  <Trash2 size={17} />
                </button>
              </div>

              <div className="grid grid-cols-[1fr_80px] gap-2">
                <select
                  value={scorer.player || ''}
                  onChange={(e) =>
                    updateScorer(scorer.id, { player: e.target.value })
                  }
                  className="field text-sm"
                >
                  <option value="">選手を選択</option>
                  {playerOptions
                    .filter((player) => player.position !== 'GK')
                    .map((player) => (
                      <option key={player.name} value={player.name}>
                        #{player.number} {player.name}
                      </option>
                    ))}
                </select>

                <input
                  type="text"
                  inputMode="numeric"
                  value={scorer.minute || ''}
                  onChange={(e) =>
                    updateScorer(scorer.id, {
                      minute: e.target.value.replace(/[^0-9]/g, ''),
                    })
                  }
                  placeholder="分"
                  className="field text-sm text-center"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

function SimplePositionBoard({ draft, updateDraft, records = [] }) {
  const [activeSlotKey, setActiveSlotKey] = useState(null);

  const formation = draft.formation || '3-4-2-1';
  const slots = formationLayouts[formation] || formationLayouts['3-4-2-1'];
  const lineup = draft.lineup || {};
  const previousPositionRecord = records.find((record) => {
    const data = record.draftData || {};
    return data.formation && data.lineup && Object.keys(data.lineup).length > 0;
  });

  const previousFormation = previousPositionRecord?.draftData?.formation;
  const previousLineup = previousPositionRecord?.draftData?.lineup || {};

  const hasPreviousPosition =
    previousFormation &&
    previousLineup &&
    Object.keys(previousLineup).length > 0;

  const isUsingPreviousPosition =
    hasPreviousPosition &&
    formation === previousFormation &&
    JSON.stringify(lineup) === JSON.stringify(previousLineup);

  const applyPreviousPosition = () => {
    if (!hasPreviousPosition) return;

    // すでに前回の記録を反映中なら、もう一回押した時に外す
    if (isUsingPreviousPosition) {
      updateDraft({
        lineup: {},
      });

      setActiveSlotKey(null);
      return;
    }

    // まだ反映していない時は、前回のポジションを入れる
    updateDraft({
      formation: previousFormation,
      lineup: { ...previousLineup },
    });

    setActiveSlotKey(null);
  };
  const getPlayerCandidates = (slotKey) => {
    const allowedPositionsBySlot = {
      GK: ['GK'],

      CBL: ['DF'],
      CB: ['DF'],
      CBR: ['DF'],
      CB1: ['DF'],
      CB2: ['DF'],
      LB: ['DF', 'MF'],
      RB: ['DF', 'MF'],

      LWB: ['DF', 'MF'],
      RWB: ['DF', 'MF'],

      DMF1: ['MF'],
      DMF2: ['MF'],
      CMF1: ['MF'],
      CMF2: ['MF'],
      OMF: ['MF', 'FW'],

      LMF: ['MF', 'FW'],
      RMF: ['MF', 'FW'],
      SHADOW1: ['MF', 'FW'],
      SHADOW2: ['MF', 'FW'],

      LWG: ['FW', 'MF'],
      RWG: ['FW', 'MF'],
      CF: ['FW'],
      FW1: ['FW'],
      FW2: ['FW'],
    };

    const allowedPositions = allowedPositionsBySlot[slotKey] || ['GK', 'DF', 'MF', 'FW'];

    return playerOptions.filter((player) => {
      const isAllowedPosition = allowedPositions.includes(player.position);

      const isSpecialDmfPlayer =
        (slotKey === 'DMF1' || slotKey === 'DMF2') &&
        player.name === '新井 直人';

      return isAllowedPosition || isSpecialDmfPlayer;
    });
  };

  const activeSlot = slots.find((slot) => slot.key === activeSlotKey);
  const changeFormation = (nextFormation) => {
    updateDraft({
      formation: nextFormation,
      lineup: {},
    });

    setActiveSlotKey(null);
  };

  const updatePlayer = (positionKey, playerName) => {
    updateDraft({
      lineup: {
        ...lineup,
        [positionKey]: playerName,
      },
    });

    setActiveSlotKey(null);
  };

  const clearPlayer = (positionKey) => {
    const nextLineup = { ...lineup };
    delete nextLineup[positionKey];

    updateDraft({
      lineup: nextLineup,
    });

    setActiveSlotKey(null);
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-[#4b1c89] font-black">
          <Shirt size={18} />
          スタメンポジション
        </div>

        <select
          value={formation}
          onChange={(e) => changeFormation(e.target.value)}
          className="text-xs font-black text-[#4b1c89] bg-purple-50 border border-purple-100 rounded-full px-3 py-2 outline-none"
        >
          {Object.keys(formationLayouts).map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <p className="text-[11px] text-gray-500 font-bold mb-3">
        ユニフォームをタップして選手を選択
      </p>
      <button
        type="button"
        onClick={applyPreviousPosition}
        disabled={!hasPreviousPosition}
        className={`w-full mb-4 rounded-2xl border p-3 flex items-center gap-3 text-left active:scale-[0.98] ${hasPreviousPosition
          ? 'bg-purple-50 border-purple-100 text-[#4b1c89]'
          : 'bg-gray-50 border-gray-100 text-gray-400'
          }`}
      >
        <div
          className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 ${isUsingPreviousPosition
            ? 'bg-[#4b1c89] border-[#4b1c89] text-white'
            : hasPreviousPosition
              ? 'bg-white border-[#4b1c89] text-transparent'
              : 'bg-white border-gray-300 text-transparent'
            }`}
        >
          <CheckCircle2 size={16} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="text-sm font-black">
            前回の記録を反映
          </div>

          <div className="text-[11px] font-bold opacity-70 mt-0.5">
            {hasPreviousPosition
              ? `${previousPositionRecord.date} のポジションをコピー`
              : '前回のポジション記録がありません'}
          </div>
        </div>
      </button>

      <div className="relative h-[380px] rounded-[1.6rem] overflow-hidden bg-gradient-to-b from-[#16a34a] to-[#166534] border-4 border-green-200 shadow-inner">
        {/* ピッチ線 */}
        <div className="absolute inset-3 border-2 border-white/70 rounded-xl"></div>
        <div className="absolute left-3 right-3 top-1/2 border-t-2 border-white/60"></div>
        <div className="absolute left-1/2 top-1/2 w-20 h-20 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/60"></div>
        <div className="absolute left-1/2 bottom-3 w-28 h-16 -translate-x-1/2 border-2 border-white/60 border-b-0 rounded-t-xl"></div>
        <div className="absolute left-1/2 top-3 w-28 h-16 -translate-x-1/2 border-2 border-white/60 border-t-0 rounded-b-xl"></div>

        {slots.map((slot) => {
          const playerName = lineup[slot.key];
          const player = playerOptions.find((p) => p.name === playerName);
          const isActive = activeSlotKey === slot.key;

          return (
            <button
              type="button"
              key={slot.key}
              onClick={() => setActiveSlotKey(slot.key)}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center active:scale-95 transition"
              style={{
                left: `${slot.x}%`,
                top: `${slot.y}%`,
              }}
            >
              <div
                className={`w-11 h-11 rounded-2xl flex flex-col items-center justify-center shadow-lg border-2 ${isActive
                  ? 'bg-yellow-300 text-[#4b1c89] border-white ring-4 ring-yellow-200/60'
                  : player
                    ? 'bg-[#4b1c89] text-white border-yellow-300'
                    : 'bg-white/85 text-gray-400 border-white'
                  }`}
              >
                <Shirt size={18} fill="currentColor" strokeWidth={0} />

                <div className="text-[11px] font-black leading-none mt-0.5">
                  {player ? player.number : '-'}
                </div>
              </div>





              <div className="mt-1 bg-white/95 text-[#171425] rounded-full px-2 py-0.5 text-[8px] font-black shadow-sm max-w-[62px] truncate">
                {player ? player.name.replace(' ', '') : slot.label}
              </div>
            </button>
          );
        })}
      </div>

      {activeSlot && (
        <div className="fixed inset-0 z-[1200] bg-black/45 flex items-end justify-center">
          <div className="w-full max-w-md bg-white rounded-t-[2rem] p-5 shadow-2xl max-h-[70vh] overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-[11px] text-[#4b1c89] font-black tracking-widest">
                  SELECT PLAYER
                </div>
                <div className="text-xl font-black text-[#171425] mt-1">
                  {activeSlot.label}を選択
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveSlotKey(null)}
                className="w-9 h-9 rounded-full bg-gray-100 text-gray-500 font-black"
              >
                ×
              </button>
            </div>

            <div className="space-y-2 overflow-y-auto max-h-[48vh] pr-1">
              <button
                type="button"
                onClick={() => clearPlayer(activeSlot.key)}
                className="w-full flex items-center gap-3 rounded-2xl p-3 bg-gray-50 border border-gray-100 text-left active:scale-[0.98]"
              >
                <div className="w-11 h-11 rounded-2xl bg-white text-gray-400 flex items-center justify-center border border-gray-200">
                  -
                </div>

                <div className="flex-1">
                  <div className="font-black text-gray-500">
                    未選択に戻す
                  </div>
                  <div className="text-[11px] text-gray-400 font-bold mt-0.5">
                    このポジションの選手を外します
                  </div>
                </div>
              </button>

              {getPlayerCandidates(activeSlot.key).map((player) => {
                const selectedHere = lineup[activeSlot.key] === player.name;
                const alreadyUsed = Object.entries(lineup).some(
                  ([key, name]) => key !== activeSlot.key && name === player.name
                );

                return (
                  <button
                    type="button"
                    key={player.name}
                    onClick={() => updatePlayer(activeSlot.key, player.name)}
                    className={`w-full flex items-center gap-3 rounded-2xl p-3 border text-left active:scale-[0.98] ${selectedHere
                      ? 'bg-purple-50 border-purple-200'
                      : 'bg-white border-gray-100'
                      }`}
                  >
                    <div
                      className={`w-11 h-11 rounded-2xl flex flex-col items-center justify-center ${selectedHere
                        ? 'bg-[#4b1c89] text-white'
                        : 'bg-[#f8f7fb] text-[#4b1c89]'
                        }`}
                    >
                      <Shirt size={16} fill="currentColor" strokeWidth={0} />
                      <div className="text-[11px] font-black leading-none">
                        {player.number}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="font-black text-[#171425] truncate">
                        {player.name}
                      </div>
                      <div className="text-[11px] text-gray-400 font-bold mt-0.5">
                        #{player.number} / {player.position}
                        {alreadyUsed ? ' ・他ポジションで選択中' : ''}
                      </div>
                    </div>

                    {selectedHere && (
                      <CheckCircle2 size={20} className="text-[#4b1c89]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

function CreateStep3({ setView, draft, updateDraft, onSaveDraft }) {
  const [editingTimelineId, setEditingTimelineId] = useState(null);
  const [dragIndex, setDragIndex] = useState(null);

  const expenseItems = [
    { id: 'ticket', icon: <Ticket size={17} />, label: 'チケット代' },
    { id: 'goods', icon: <ShoppingBag size={17} />, label: 'グッズ代' },
    { id: 'food', icon: <Utensils size={17} />, label: 'ご飯・飲み物代' },
    { id: 'transport', icon: <Train size={17} />, label: '交通費' },
    { id: 'other', icon: <MoreHorizontal size={17} />, label: 'その他' },
  ];

  const total = Object.values(draft.expenses || {}).reduce(
    (sum, value) => sum + moneyToNumber(value),
    0
  );

  const updateExpense = (key, value) => {
    const cleanedValue = String(value ?? '').replace(/[^0-9]/g, '');

    updateDraft({
      expenses: {
        ...draft.expenses,
        [key]: cleanedValue,
      },
    });
  };

  const updateTimeline = (id, updates) => {
    updateDraft({
      timeline: draft.timeline.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      ),
    });
  };

  const removeTimeline = (id) => {
    updateDraft({
      timeline: draft.timeline.filter((item) => item.id !== id),
    });
  };

  const addTimeline = () => {
    updateDraft({
      timeline: [
        ...draft.timeline,
        {
          id: Date.now(),
          time: '16:00',
          desc: '新しいイベント',
        },
      ],
    });
  };

  const handleDragStart = (index) => {
    setDragIndex(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (dropIndex) => {
    if (dragIndex === null || dragIndex === dropIndex) return;

    const newTimeline = [...draft.timeline];
    const draggedItem = newTimeline[dragIndex];

    newTimeline.splice(dragIndex, 1);
    newTimeline.splice(dropIndex, 0, draggedItem);

    updateDraft({
      timeline: newTimeline,
    });

    setDragIndex(null);
  };

  return (
    <CreateShell setView={setView} backTo="step2" step={3} onSaveDraft={onSaveDraft}>
      <div className="space-y-4">
        {/* 金額 */}
        <Card>
          <div className="flex items-center gap-2 text-[#4b1c89] font-black mb-3">
            <Wallet size={18} />
            金額を入力
            <span className="text-xs text-gray-400">（任意）</span>
          </div>

          <p className="text-xs text-gray-500 font-bold mb-4">
            金額を押すと編集できます。入力すると合計金額が自動で変わります。
          </p>

          <div className="space-y-2">
            {expenseItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b border-dashed border-gray-200 py-3"
              >
                <div className="flex items-center gap-3 font-black text-[#171425]">
                  <span className="text-[#4b1c89]">{item.icon}</span>
                  {item.label}
                </div>

                <div className="flex items-center gap-1">
                  <span className="text-sm font-black text-gray-400">¥</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={draft.expenses?.[item.id] ?? ''}
                    onChange={(e) => updateExpense(item.id, e.target.value)}
                    placeholder="0"
                    className="w-24 text-right outline-none font-black text-[#4b1c89] bg-purple-50 rounded-lg px-2 py-1 focus:ring-4 focus:ring-purple-100"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t-2 border-gray-100 flex justify-between items-end">
            <div>
              <div className="text-sm text-gray-500 font-black">合計金額</div>
              <div className="text-xs text-gray-400 font-bold mt-1">
                観戦にかかった総額
              </div>
            </div>

            <div className="text-3xl font-black text-[#4b1c89] tracking-tight">
              ¥{total.toLocaleString()}
            </div>
          </div>
        </Card>

        {/* タイムライン */}
        <Card>
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2 text-[#4b1c89] font-black">
              <Clock size={18} />
              タイムラインを入力
              <span className="text-xs text-gray-400">（任意）</span>
            </div>

            <button
              type="button"
              onClick={addTimeline}
              className="border border-[#4b1c89] text-[#4b1c89] rounded-full px-3 py-2 text-xs font-black flex items-center gap-1 hover:bg-purple-50"
            >
              <Plus size={15} />
              追加
            </button>
          </div>

          <p className="text-xs text-gray-500 font-bold mb-5">
            ペンで編集、ごみ箱で削除できます。項目を長押しして動かすと順番を入れ替えられます。
          </p>

          <div className="relative ml-3 border-l-2 border-[#4b1c89] space-y-4">
            {draft.timeline.map((item, index) => {
              const isEditing = editingTimelineId === item.id;

              return (
                <div
                  key={item.id}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(index)}
                  onDragEnd={() => setDragIndex(null)}
                  className={`relative pl-6 transition ${dragIndex === index ? 'opacity-40' : 'opacity-100'
                    }`}
                >
                  <div className="absolute -left-[9px] top-4 w-4 h-4 rounded-full border-2 border-[#4b1c89] bg-white"></div>

                  <div className="bg-white border border-gray-200 rounded-2xl p-3 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="text-gray-400 cursor-grab active:cursor-grabbing">
                        <MoreHorizontal size={20} />
                      </div>

                      {isEditing ? (
                        <input
                          type="time"
                          value={item.time}
                          onChange={(e) => updateTimeline(item.id, { time: e.target.value })}
                          className="w-20 border border-gray-200 rounded-lg px-2 py-1 text-sm font-black outline-none focus:border-[#4b1c89]"
                        />
                      ) : (
                        <div className="w-16 font-black text-[#4b1c89]">
                          {item.time}
                        </div>
                      )}

                      {isEditing ? (
                        <input
                          type="text"
                          value={item.desc}
                          onChange={(e) => updateTimeline(item.id, { desc: e.target.value })}
                          className="flex-1 min-w-0 border border-gray-200 rounded-lg px-2 py-1 text-sm font-bold outline-none focus:border-[#4b1c89]"
                        />
                      ) : (
                        <div className="flex-1 min-w-0 font-bold text-sm truncate">
                          {item.desc}
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() =>
                          setEditingTimelineId(isEditing ? null : item.id)
                        }
                        className="interactive-icon text-[#4b1c89]"
                      >
                        {isEditing ? <CheckCircle2 size={18} /> : <Pencil size={17} />}
                      </button>

                      <button
                        type="button"
                        onClick={() => removeTimeline(item.id)}
                        className="interactive-icon text-red-500"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <BottomAction>
        <button onClick={() => setView('step2')} className="secondary-btn">
          <ChevronLeft size={20} />
          戻る
        </button>

        <button onClick={() => setView('confirm')} className="primary-btn flex-[1.4]">
          確認画面へ
          <ChevronRight size={22} />
        </button>
      </BottomAction>
    </CreateShell>
  );
}

function ConfirmPositionBoard({ draft }) {
  const formation = draft.formation || '3-4-2-1';
  const slots = formationLayouts[formation] || formationLayouts['3-4-2-1'];
  const lineup = draft.lineup || {};

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-[#4b1c89] font-black">
          <Shirt size={18} />
          ポジション確認
        </div>

        <div className="text-xs font-black text-[#4b1c89] bg-purple-50 border border-purple-100 rounded-full px-3 py-1">
          {formation}
        </div>
      </div>

      <div className="relative h-[360px] rounded-[1.6rem] overflow-hidden bg-gradient-to-b from-[#16a34a] to-[#166534] border-4 border-green-200 shadow-inner">
        {/* ピッチ線 */}
        <div className="absolute inset-3 border-2 border-white/70 rounded-xl"></div>
        <div className="absolute left-3 right-3 top-1/2 border-t-2 border-white/60"></div>
        <div className="absolute left-1/2 top-1/2 w-20 h-20 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/60"></div>
        <div className="absolute left-1/2 bottom-3 w-28 h-16 -translate-x-1/2 border-2 border-white/60 border-b-0 rounded-t-xl"></div>
        <div className="absolute left-1/2 top-3 w-28 h-16 -translate-x-1/2 border-2 border-white/60 border-t-0 rounded-b-xl"></div>

        {slots.map((slot) => {
          const playerName = lineup[slot.key];
          const player = playerOptions.find((p) => p.name === playerName);

          return (
            <div
              key={slot.key}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
              style={{
                left: `${slot.x}%`,
                top: `${slot.y}%`,
              }}
            >
              <div
                className={`w-11 h-11 rounded-2xl flex flex-col items-center justify-center shadow-lg border-2 ${player
                  ? 'bg-[#4b1c89] text-white border-yellow-300'
                  : 'bg-white/85 text-gray-400 border-white'
                  }`}
              >
                <Shirt size={18} fill="currentColor" strokeWidth={0} />

                <div className="text-[11px] font-black leading-none mt-0.5">
                  {player ? player.number : '-'}
                </div>
              </div>

              <div className="mt-1 bg-white/95 text-[#171425] rounded-full px-2 py-0.5 text-[8px] font-black shadow-sm max-w-[62px] truncate">
                {player ? player.name.replace(' ', '') : slot.label}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function ConfirmView({ setView, draft, onSave, onSaveDraft }) {
  const seatDetail = [
    draft.seat,
    draft.seatBlock,
    draft.seatRow,
    draft.seatNumber ? `${draft.seatNumber}番` : '',
  ].filter(Boolean).join(' / ');
  const total = Object.values(draft.expenses || {}).reduce(
    (sum, value) => sum + moneyToNumber(value),
    0
  );

  const selectedMvp =
    playerOptions.find((player) => player.name === draft.mvp) ||
    playerOptions[0];

  return (
    <CreateShell setView={setView} backTo="step3" step={4} onSaveDraft={onSaveDraft}>
      <div className="space-y-4">
        {/* 試合結果メインカード */}
        <div className="relative overflow-hidden rounded-[1.6rem] bg-gradient-to-br from-[#2a075f] via-[#4b1c89] to-[#6d28d9] text-white shadow-xl shadow-purple-900/25">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.18),transparent_28%),radial-gradient(circle_at_85%_20%,rgba(250,204,21,0.18),transparent_25%)]"></div>
          <div className="absolute right-[-40px] bottom-[-60px] w-40 h-40 border border-white/10 rounded-full"></div>

          <div className="relative z-10 p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-[11px] font-black text-white/70">
                  {draft.date} / {draft.tournament}
                </div>
                <div className="text-sm font-black mt-1 flex items-center gap-1">
                  <MapPin size={14} />
                  {draft.stadium}
                </div>
              </div>

              <div className="bg-yellow-300 text-[#2a075f] text-xs font-black px-3 py-1.5 rounded-full shadow">
                {draft.homeScore > draft.awayScore ? 'WIN' : draft.homeScore === draft.awayScore ? 'DRAW' : 'LOSE'}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto flex items-center justify-center">
                    <TeamBadge team={sanfrecceTeam} size="small" />
                  </div>
                  <div className="text-xs font-black mt-2 whitespace-nowrap">
                    サンフレッチェ広島
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-[42px] font-black leading-none tracking-[-0.08em] drop-shadow-md">
                    {draft.homeScore}
                    <span className="text-white/60 mx-1">-</span>
                    {draft.awayScore}
                  </div>
                  <div className="text-[10px] font-black text-yellow-300 mt-2 tracking-widest">
                    FULL TIME
                  </div>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 mx-auto flex items-center justify-center">
                    <TeamBadge
                      team={
                        opponentTeams.find((team) => team.name === draft.opponent) ||
                        { name: draft.opponent, main: '#94a3b8', sub: '#cbd5e1' }
                      }
                      size="small"
                    />
                  </div>
                  <div className="text-xs font-black mt-2 truncate">
                    {draft.opponent}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Card>
          <div className="flex items-center gap-2 text-[#4b1c89] font-black mb-4">
            <Trophy size={18} />
            得点者確認
          </div>

          {(draft.scorers || []).length > 0 ? (
            <div className="space-y-2">
              {(draft.scorers || []).map((scorer, index) => {
                const player = playerOptions.find((p) => p.name === scorer.player);

                return (
                  <div
                    key={scorer.id}
                    className="flex items-center gap-3 bg-[#f8f7fb] border border-gray-100 rounded-2xl p-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#4b1c89] text-white flex items-center justify-center font-black">
                      {player ? player.number : index + 1}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-black text-[#171425] truncate">
                        {scorer.player || '未入力'}
                      </div>
                      <div className="text-[11px] text-gray-400 font-bold mt-0.5">
                        {scorer.minute ? `${scorer.minute}分` : '時間未入力'}
                        {player ? ` / ${player.position}` : ''}
                      </div>
                    </div>

                    <div className="text-lg font-black text-[#4b1c89]">
                      GOAL
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="h-20 rounded-2xl bg-gray-50 border border-dashed border-gray-200 flex items-center justify-center text-sm text-gray-400 font-bold">
              得点者は未入力です
            </div>
          )}
        </Card>

        <ConfirmPositionBoard draft={draft} />

        {/* 基本情報 */}
        <Card>
          <div className="grid grid-cols-2 gap-3">
            <ConfirmMiniCard label="開催地" value={draft.venueType || 'ホーム'} icon={<MapPin size={16} />} />
            <ConfirmMiniCard label="天気" value={draft.weather} icon={<Sun size={16} />} />
            <ConfirmMiniCard label="同行者" value={draft.companion} icon={<Users size={16} />} />
            <ConfirmMiniCard label="座席" value={seatDetail || '未入力'} icon={<Ticket size={16} />} />
          </div>
        </Card>

        {/* 満足度・MVP・金額 */}
        <Card>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <div className="text-xs text-gray-500 font-black mb-2">満足度</div>
              <div className="text-2xl font-black text-[#4b1c89]">{draft.rating}.0</div>
              <div className="flex justify-center mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={12}
                    fill={star <= draft.rating ? '#f6c400' : '#e5e7eb'}
                    className={star <= draft.rating ? 'text-yellow-400' : 'text-gray-200'}
                  />
                ))}
              </div>
            </div>

            <div className="text-center border-x border-gray-100">
              <div className="text-xs text-gray-500 font-black mb-2">今日のMVP</div>
              <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br from-[#4b1c89] to-[#2a075f] text-white flex flex-col items-center justify-center shadow-md">
                <div className="text-[9px] font-black text-white/70">No.</div>
                <div className="text-xl font-black leading-none">{selectedMvp.number}</div>
              </div>
              <div className="text-[11px] font-black text-[#4b1c89] mt-2 truncate">
                {selectedMvp.name}
              </div>
            </div>

            <div className="text-center">
              <div className="text-xs text-gray-500 font-black mb-2">合計費用</div>
              <div className="text-xl font-black text-[#4b1c89] leading-tight">
                ¥{total.toLocaleString()}
              </div>
              <div className="text-[10px] text-gray-400 font-bold mt-1">
                観戦総額
              </div>
            </div>
          </div>
        </Card>

        {/* 思い出メモ */}
        <Card>
          <div className="flex items-center gap-2 text-[#4b1c89] font-black mb-3">
            <PenSquare size={17} />
            思い出メモ
          </div>
          <p className="text-sm leading-relaxed whitespace-pre-wrap text-[#171425]">
            {draft.memo || '未入力'}
          </p>
        </Card>

        {/* タグ */}
        <Card>
          <div className="flex items-center gap-2 text-[#4b1c89] font-black mb-3">
            <TagIcon size={17} />
            タグ
          </div>

          <div className="flex flex-wrap gap-2">
            {draft.tags.length > 0 ? (
              draft.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-purple-100 text-[#4b1c89] text-xs font-black px-3 py-1.5 rounded-full"
                >
                  #{tag}
                </span>
              ))
            ) : (
              <span className="text-sm text-gray-400 font-bold">タグなし</span>
            )}
          </div>
        </Card>

        {/* 写真 */}
        <Card>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-[#4b1c89] font-black">
              <ImageIcon size={17} />
              写真
            </div>
            <div className="text-xs text-gray-500 font-black">
              {(draft.photos || []).length}/10枚
            </div>
          </div>

          {(draft.photos || []).length > 0 ? (
            <div className="grid grid-cols-3 gap-3">
              {draft.photos.map((photo) => (
                <img
                  key={photo.id}
                  src={photo.url}
                  alt={photo.name}
                  className="w-full h-24 object-cover rounded-2xl border border-gray-200 shadow-sm"
                />
              ))}
            </div>
          ) : (
            <div className="h-20 rounded-2xl bg-gray-50 border border-dashed border-gray-200 flex items-center justify-center text-sm text-gray-400 font-bold">
              写真は追加されていません
            </div>
          )}
        </Card>

        {/* 金額内訳 */}
        <Card>
          <div className="flex items-center gap-2 text-[#4b1c89] font-black mb-3">
            <Wallet size={17} />
            金額の内訳
          </div>

          <ConfirmExpenseRow label="チケット代" value={draft.expenses.ticket} />
          <ConfirmExpenseRow label="グッズ代" value={draft.expenses.goods} />
          <ConfirmExpenseRow label="ご飯・飲み物代" value={draft.expenses.food} />
          <ConfirmExpenseRow label="交通費" value={draft.expenses.transport} />
          <ConfirmExpenseRow label="その他" value={draft.expenses.other} />

          <div className="border-t mt-3 pt-3 flex justify-between items-center">
            <div className="font-black text-[#4b1c89]">合計</div>
            <div className="text-2xl font-black text-[#4b1c89]">
              ¥{total.toLocaleString()}
            </div>
          </div>
        </Card>

        {/* タイムライン */}
        <Card>
          <div className="flex items-center gap-2 text-[#4b1c89] font-black mb-4">
            <Clock size={17} />
            タイムライン
          </div>

          {draft.timeline.length > 0 ? (
            <div className="relative ml-3 border-l-2 border-[#4b1c89] space-y-4">
              {draft.timeline.map((item) => (
                <div key={item.id} className="relative pl-6">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-[#4b1c89] bg-white"></div>
                  <div className="bg-[#f8f7fb] rounded-2xl p-3 border border-gray-100">
                    <div className="text-xs font-black text-[#4b1c89]">{item.time}</div>
                    <div className="text-sm font-bold mt-1">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-20 rounded-2xl bg-gray-50 border border-dashed border-gray-200 flex items-center justify-center text-sm text-gray-400 font-bold">
              タイムラインは未入力です
            </div>
          )}
        </Card>
      </div>

      <BottomAction>
        <button onClick={() => setView('step3')} className="secondary-btn">
          <ChevronLeft size={20} />
          戻る
        </button>

        <button onClick={onSave} className="primary-btn flex-[1.4]">
          <CheckCircle2 size={20} />
          この内容で保存
        </button>
      </BottomAction>
    </CreateShell>
  );
}
function ConfirmMiniCard({ icon, label, value }) {
  return (
    <div className="bg-[#f8f7fb] rounded-2xl p-3 border border-gray-100">
      <div className="flex items-center gap-1 text-[#4b1c89] text-xs font-black mb-1">
        {icon}
        {label}
      </div>
      <div className="text-sm font-black text-[#171425] truncate">
        {value}
      </div>
    </div>
  );
}

function ConfirmExpenseRow({ label, value }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-dashed border-gray-100">
      <div className="text-sm font-bold text-gray-600">{label}</div>
      <div className="text-sm font-black text-[#171425]">
        ¥{Number(value).toLocaleString()}
      </div>
    </div>
  );
}
function TeamBadge({ team, size = 'normal' }) {
  const isSmall = size === 'small';

  return (
    <div
      className={`${isSmall ? 'w-10 h-10 rounded-xl' : 'w-14 h-14 rounded-2xl'
        } mx-auto relative flex items-center justify-center shadow-md overflow-hidden shrink-0`}
      style={{ backgroundColor: team.main }}
    >
      {/* 右下に2色目を入れる */}
      <div
        className="absolute right-0 bottom-0 w-[55%] h-[55%]"
        style={{
          backgroundColor: team.sub,
          clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
        }}
      />

      {/* 白い盾 */}
      <Shield
        size={isSmall ? 22 : 30}
        fill="white"
        strokeWidth={0}
        className="relative z-10 text-white"
      />
    </div>
  );
}
function InputBlock({ icon, label, children }) {
  return (
    <div>
      <label className="flex items-center gap-2 text-[#4b1c89] font-black mb-2">
        {icon} {label}
      </label>
      {children}
    </div>
  );
}

function Card({ children }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
      {children}
    </div>
  );
}

function BottomAction({ children }) {
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-50 bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-[0_-8px_24px_rgba(0,0,0,0.08)] px-4 pt-3 pb-[calc(12px+env(safe-area-inset-bottom))]">
      <div className="flex gap-3">
        {children}
      </div>
    </div>
  );
}

function ExpenseRow({ icon, label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-dashed border-gray-200 py-3">
      <div className="flex items-center gap-3 font-black">
        <span className="text-[#4b1c89]">{icon}</span>
        {label}
      </div>
      <div className="font-black">¥ {value.toLocaleString()}</div>
    </div>
  );
}

function StyleHelper() {
  return (
    <style>{`
      .interactive-icon {
  transition: transform 0.18s ease, filter 0.18s ease, opacity 0.18s ease;
  cursor: pointer;
}

.interactive-icon:hover {
  transform: translateY(-5px) scale(1.15);
  filter: drop-shadow(0 10px 12px rgba(75, 28, 137, 0.35));
}

.interactive-card {
  transition: transform 0.22s ease, box-shadow 0.22s ease;
  cursor: pointer;
}

.interactive-card:hover {
  transform: translateY(-6px) scale(1.01);
  box-shadow: 0 18px 34px rgba(48, 16, 96, 0.18);
}

button {
  transition: transform 0.18s ease, box-shadow 0.18s ease, opacity 0.18s ease;
}

button:hover {
  transform: translateY(-2px);
}
      .field {
        width: 100%;
        max-width: 100%;
        box-sizing:border-box;
        display:block;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        padding: 12px;
        outline: none;
        background: white;
        font-weight: 600;
      }

      .compact-field {
  padding: 9px 8px;
  font-size: 12px;
  min-height: 40px;
}
      .field:focus {
        border-color: #4b1c89;
        box-shadow: 0 0 0 3px rgba(75, 28, 137, 0.12);
      }
      .primary-btn {
        background: #4b1c89;
        color: white;
        border-radius: 999px;
        padding: 14px 18px;
        font-weight: 900;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 6px;
        box-shadow: 0 8px 18px rgba(75, 28, 137, 0.25);
      }
      .secondary-btn {
        background: white;
        color: #4b1c89;
        border: 1.5px solid #4b1c89;
        border-radius: 999px;
        padding: 14px 18px;
        font-weight: 900;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 6px;
        flex: 1;
      }
    `}</style>
  );
}
