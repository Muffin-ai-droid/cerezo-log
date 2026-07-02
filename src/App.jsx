import React, { useState, useEffect, useRef } from 'react';
import {
  Home, List, BarChart2, User, Plus, Bell, ChevronRight, ChevronLeft,
  Calendar, Trophy, Flag, MapPin, Users, Star, Tag as TagIcon,
  Image as ImageIcon,
  Wallet, Ticket, ShoppingBag, Utensils, Train, MoreHorizontal,
  Clock, Trash2, CheckCircle2, Bookmark, PenSquare, Shirt,
  Sun, Tv, Shield, Menu, Medal, CirclePlus, Pencil, Building2, Share2, Download
} from 'lucide-react';

const pink = '#ec4899';

const initialRecords = [];

const defaultDraft = {
  date: '',
  season: '2026-27',
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
  formation: '4-2-3-1',
  lineup: {},
  scorers: [],
  memo: '',
  isQuick: false,
  quickMemo: '',
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

const cerezoTeam = {
  name: 'セレッソ大阪',
  short: 'C大阪',
  main: '#ec4899',
  sub: '#d6b36a',
  stadium: 'YANMAR HANASAKA STADIUM',
};

const matchSchedule = [
  {
    section: 1,
    date: '2026-08-08',
    displayDate: '8.8',
    day: '土',
    time: '19:00',
    opponent: 'ファジアーノ岡山',
    stadium: 'YANMAR HANASAKA STADIUM',
    venueType: 'HOME',
  },
  {
    section: 2,
    date: '2026-08-15',
    displayDate: '8.15',
    day: '土',
    time: '19:00',
    opponent: 'アビスパ福岡',
    stadium: 'ベスト電器スタジアム',
    venueType: 'AWAY',
  },
  {
    section: 3,
    date: '2026-08-22',
    displayDate: '8.22',
    day: '土',
    time: '19:00',
    opponent: '清水エスパルス',
    stadium: 'YANMAR HANASAKA STADIUM',
    venueType: 'HOME',
  },
  {
    section: 4,
    date: '2026-08-29',
    displayDate: '8.29',
    day: '土',
    time: '19:00',
    opponent: 'ヴィッセル神戸',
    stadium: 'ノエビアスタジアム神戸',
    venueType: 'AWAY',
  },
  {
    section: 5,
    date: '2026-09-02',
    displayDate: '9.2',
    day: '水',
    time: '19:00',
    opponent: '柏レイソル',
    stadium: 'YANMAR HANASAKA STADIUM',
    venueType: 'HOME',
  },
  {
    section: 6,
    date: '2026-09-06',
    displayDate: '9.6',
    day: '日',
    time: '19:00',
    opponent: '東京ヴェルディ',
    stadium: 'YANMAR HANASAKA STADIUM',
    venueType: 'HOME',
  },
  {
    section: 7,
    date: '2026-09-12',
    displayDate: '9.12',
    day: '土',
    time: '19:00',
    opponent: 'サンフレッチェ広島',
    stadium: 'エディオンピースウイング広島',
    venueType: 'AWAY',
  },
  {
    section: 8,
    date: '2026-09-19',
    displayDate: '9.19',
    day: '土',
    time: '18:30',
    opponent: 'V・ファーレン長崎',
    stadium: 'PEACE STADIUM Connected by SoftBank',
    venueType: 'AWAY',
  },
  {
    section: 9,
    date: '2026-10-10',
    displayDate: '10.10',
    day: '土',
    time: '14:00',
    opponent: '横浜F・マリノス',
    stadium: 'YANMAR HANASAKA STADIUM',
    venueType: 'HOME',
  },
  {
    section: 10,
    date: '2026-10-17',
    displayDate: '10.17',
    day: '土',
    time: '15:00',
    opponent: '川崎フロンターレ',
    stadium: 'YANMAR HANASAKA STADIUM',
    venueType: 'HOME',
  },
  {
    section: 11,
    date: '2026-10-21',
    displayDate: '10.21',
    day: '水',
    time: '19:00',
    opponent: '名古屋グランパス',
    stadium: 'パロマ瑞穂スタジアム',
    venueType: 'AWAY',
  },
  {
    section: 12,
    date: '2026-10-25',
    displayDate: '10.25',
    day: '日',
    time: '15:00',
    opponent: 'ジェフユナイテッド千葉',
    stadium: 'YANMAR HANASAKA STADIUM',
    venueType: 'HOME',
  },
  {
    section: 13,
    date: '2026-10-31',
    displayDate: '10.31',
    day: '土',
    time: '15:00',
    opponent: '鹿島アントラーズ',
    stadium: 'メルカリスタジアム',
    venueType: 'AWAY',
  },
  {
    section: 14,
    date: '2026-11-08',
    displayDate: '11.8',
    day: '日',
    time: '15:00',
    opponent: 'ガンバ大阪',
    stadium: 'パナソニック スタジアム 吹田',
    venueType: 'AWAY',
  },
  {
    section: 15,
    date: '2026-11-21',
    displayDate: '11.21',
    day: '土',
    time: '15:00',
    opponent: 'FC東京',
    stadium: 'YANMAR HANASAKA STADIUM',
    venueType: 'HOME',
  },
  {
    section: 16,
    date: '2026-11-25',
    displayDate: '11.25',
    day: '水',
    time: '19:30',
    opponent: '浦和レッズ',
    stadium: '埼玉スタジアム2002',
    venueType: 'AWAY',
  },
  {
    section: 17,
    date: '2026-11-28',
    displayDate: '11.28 / 11.29',
    day: '土日',
    time: '未定',
    opponent: '京都サンガF.C.',
    stadium: 'サンガスタジアム by KYOCERA',
    venueType: 'AWAY',
  },
  {
    section: 18,
    date: '2026-12-05',
    displayDate: '12.5',
    day: '土',
    time: '15:00',
    opponent: '水戸ホーリーホック',
    stadium: 'YANMAR HANASAKA STADIUM',
    venueType: 'HOME',
  },
  {
    section: 19,
    date: '2026-12-12',
    displayDate: '12.12',
    day: '土',
    time: '14:00',
    opponent: 'FC町田ゼルビア',
    stadium: 'YANMAR HANASAKA STADIUM',
    venueType: 'HOME',
  },
  {
    section: 20,
    date: '2026-12-19',
    displayDate: '12.19',
    day: '土',
    time: '13:00',
    opponent: 'ジェフユナイテッド千葉',
    stadium: 'フクダ電子アリーナ',
    venueType: 'AWAY',
  },
  {
    section: 21,
    date: '2027-02-13',
    displayDate: '2.13 / 2.14',
    day: '土日',
    time: '未定',
    opponent: 'ガンバ大阪',
    stadium: 'YANMAR HANASAKA STADIUM',
    venueType: 'HOME',
  },
  {
    section: 22,
    date: '2027-02-20',
    displayDate: '2.20 / 2.21',
    day: '土日',
    time: '未定',
    opponent: 'ヴィッセル神戸',
    stadium: 'YANMAR HANASAKA STADIUM',
    venueType: 'HOME',
  },
  {
    section: 23,
    date: '2027-02-27',
    displayDate: '2.27 / 2.28',
    day: '土日',
    time: '未定',
    opponent: '横浜F・マリノス',
    stadium: '日産スタジアム',
    venueType: 'AWAY',
  },
  {
    section: 24,
    date: '2027-03-06',
    displayDate: '3.6 / 3.7',
    day: '土日',
    time: '未定',
    opponent: 'サンフレッチェ広島',
    stadium: 'YANMAR HANASAKA STADIUM',
    venueType: 'HOME',
  },
  {
    section: 25,
    date: '2027-03-10',
    displayDate: '3.10',
    day: '水',
    time: '未定',
    opponent: '水戸ホーリーホック',
    stadium: '水戸信用金庫スタジアム',
    venueType: 'AWAY',
  },
  {
    section: 26,
    date: '2027-03-13',
    displayDate: '3.13 / 3.14',
    day: '土日',
    time: '未定',
    opponent: 'FC東京',
    stadium: '味の素スタジアム',
    venueType: 'AWAY',
  },
  {
    section: 27,
    date: '2027-03-20',
    displayDate: '3.20 / 3.21',
    day: '土日',
    time: '未定',
    opponent: '京都サンガF.C.',
    stadium: 'YANMAR HANASAKA STADIUM',
    venueType: 'HOME',
  },
  {
    section: 28,
    date: '2027-04-03',
    displayDate: '4.3 / 4.4',
    day: '土日',
    time: '未定',
    opponent: '柏レイソル',
    stadium: '三協フロンテア柏スタジアム',
    venueType: 'AWAY',
  },
  {
    section: 29,
    date: '2027-04-09',
    displayDate: '4.9',
    day: '金',
    time: '未定',
    opponent: 'アビスパ福岡',
    stadium: 'YANMAR HANASAKA STADIUM',
    venueType: 'HOME',
  },
  {
    section: 30,
    date: '2027-04-17',
    displayDate: '4.17 / 4.18',
    day: '土日',
    time: '未定',
    opponent: '鹿島アントラーズ',
    stadium: 'YANMAR HANASAKA STADIUM',
    venueType: 'HOME',
  },
  {
    section: 31,
    date: '2027-04-24',
    displayDate: '4.24 / 4.25',
    day: '土日',
    time: '未定',
    opponent: 'ファジアーノ岡山',
    stadium: 'JFE晴れの国スタジアム',
    venueType: 'AWAY',
  },
  {
    section: 32,
    date: '2027-04-29',
    displayDate: '4.29',
    day: '木祝',
    time: '未定',
    opponent: 'V・ファーレン長崎',
    stadium: 'YANMAR HANASAKA STADIUM',
    venueType: 'HOME',
  },
  {
    section: 33,
    date: '2027-05-03',
    displayDate: '5.3 / 5.4',
    day: '月祝/火祝',
    time: '未定',
    opponent: '東京ヴェルディ',
    stadium: '味の素スタジアム',
    venueType: 'AWAY',
  },
  {
    section: 34,
    date: '2027-05-09',
    displayDate: '5.9',
    day: '日',
    time: '未定',
    opponent: '名古屋グランパス',
    stadium: 'YANMAR HANASAKA STADIUM',
    venueType: 'HOME',
  },
  {
    section: 35,
    date: '2027-05-15',
    displayDate: '5.15 / 5.16',
    day: '土日',
    time: '未定',
    opponent: '清水エスパルス',
    stadium: 'IAIスタジアム日本平',
    venueType: 'AWAY',
  },
  {
    section: 36,
    date: '2027-05-22',
    displayDate: '5.22 / 5.23',
    day: '土日',
    time: '未定',
    opponent: '川崎フロンターレ',
    stadium: 'Uvanceとどろきスタジアム by Fujitsu',
    venueType: 'AWAY',
  },
  {
    section: 37,
    date: '2027-05-29',
    displayDate: '5.29 / 5.30',
    day: '土日',
    time: '未定',
    opponent: '浦和レッズ',
    stadium: 'YANMAR HANASAKA STADIUM',
    venueType: 'HOME',
  },
];

const hundredYearSchedule = [
  {
    section: 1,
    date: '2026-02-06',
    displayDate: '2.6',
    day: '金',
    time: '16:00',
    opponent: 'ガンバ大阪',
    stadium: 'YANMAR HANASAKA STADIUM',
    venueType: 'HOME',
  },
  {
    section: 2,
    date: '2026-02-14',
    displayDate: '2.14',
    day: '土',
    time: '15:00',
    opponent: 'アビスパ福岡',
    stadium: 'ベスト電器スタジアム',
    venueType: 'AWAY',
  },
  {
    section: 3,
    date: '2026-02-21',
    displayDate: '2.21',
    day: '土',
    time: '15:00',
    opponent: 'サンフレッチェ広島',
    stadium: 'YANMAR HANASAKA STADIUM',
    venueType: 'HOME',
  },
  {
    section: 4,
    date: '2026-02-27',
    displayDate: '2.27',
    day: '金',
    time: '17:00',
    opponent: 'V・ファーレン長崎',
    stadium: 'PEACE STADIUM Connected by SoftBank',
    venueType: 'AWAY',
  },
  {
    section: 5,
    date: '2026-03-06',
    displayDate: '3.6',
    day: '金',
    time: '15:00',
    opponent: '清水エスパルス',
    stadium: 'YANMAR HANASAKA STADIUM',
    venueType: 'HOME',
  },
  {
    section: 6,
    date: '2026-03-13',
    displayDate: '3.13',
    day: '金',
    time: '14:00',
    opponent: '京都サンガF.C.',
    stadium: 'サンガスタジアム by KYOCERA',
    venueType: 'AWAY',
  },
  {
    section: 7,
    date: '2026-03-17',
    displayDate: '3.17',
    day: '火',
    time: '18:30',
    opponent: 'ファジアーノ岡山',
    stadium: 'YANMAR HANASAKA STADIUM',
    venueType: 'HOME',
  },
  {
    section: 8,
    date: '2026-03-21',
    displayDate: '3.21',
    day: '土',
    time: '15:00',
    opponent: 'ヴィッセル神戸',
    stadium: 'YANMAR HANASAKA STADIUM',
    venueType: 'HOME',
  },
  {
    section: 9,
    date: '2026-04-03',
    displayDate: '4.3',
    day: '金',
    time: '15:00',
    opponent: '名古屋グランパス',
    stadium: 'パロマ瑞穂スタジアム',
    venueType: 'AWAY',
  },
  {
    section: 10,
    date: '2026-04-10',
    displayDate: '4.10',
    day: '金',
    time: '16:00',
    opponent: 'ガンバ大阪',
    stadium: 'パナソニック スタジアム 吹田',
    venueType: 'AWAY',
  },
  {
    section: 11,
    date: '2026-04-17',
    displayDate: '4.17',
    day: '金',
    time: '16:00',
    opponent: '京都サンガF.C.',
    stadium: 'YANMAR HANASAKA STADIUM',
    venueType: 'HOME',
  },
  {
    section: 12,
    date: '2026-04-24',
    displayDate: '4.24',
    day: '金',
    time: '16:00',
    opponent: 'サンフレッチェ広島',
    stadium: 'エディオンピースウイング広島',
    venueType: 'AWAY',
  },
  {
    section: 13,
    date: '2026-04-28',
    displayDate: '4.28',
    day: '火',
    time: '14:00',
    opponent: 'ヴィッセル神戸',
    stadium: 'ノエビアスタジアム神戸',
    venueType: 'AWAY',
  },
  {
    section: 14,
    date: '2026-05-02',
    displayDate: '5.2',
    day: '土',
    time: '15:00',
    opponent: 'アビスパ福岡',
    stadium: 'YANMAR HANASAKA STADIUM',
    venueType: 'HOME',
  },
  {
    section: 15,
    date: '2026-05-05',
    displayDate: '5.5',
    day: '火祝',
    time: '13:00',
    opponent: '清水エスパルス',
    stadium: 'IAIスタジアム日本平',
    venueType: 'AWAY',
  },
  {
    section: 16,
    date: '2026-05-08',
    displayDate: '5.8',
    day: '金',
    time: '16:00',
    opponent: 'V・ファーレン長崎',
    stadium: 'YANMAR HANASAKA STADIUM',
    venueType: 'HOME',
  },
  {
    section: 17,
    date: '2026-05-16',
    displayDate: '5.16',
    day: '土',
    time: '15:00',
    opponent: '名古屋グランパス',
    stadium: 'YANMAR HANASAKA STADIUM',
    venueType: 'HOME',
  },
  {
    section: 18,
    date: '2026-05-23',
    displayDate: '5.23',
    day: '土',
    time: '12:55',
    opponent: 'ファジアーノ岡山',
    stadium: 'JFE晴れの国スタジアム',
    venueType: 'AWAY',
  },
  {
    section: 19,
    date: '2026-05-29',
    displayDate: '5.29',
    day: '金',
    time: '15:00',
    opponent: 'FC東京',
    stadium: 'YANMAR HANASAKA STADIUM',
    venueType: 'HOME',
  },
  {
    section: 20,
    date: '2026-06-05',
    displayDate: '6.5',
    day: '金',
    time: '14:00',
    opponent: 'FC東京',
    stadium: 'MUFGスタジアム',
    venueType: 'AWAY',
  },
];

const seasonOptions = [
  {
    key: '2026-27',
    label: '2026/27シーズン',
    tournament: '明治安田J1リーグ',
  },
  {
    key: '100year',
    label: '百年構想リーグ',
    tournament: '明治安田J1百年構想リーグ',
  },
];

const seasonSchedules = {
  '2026-27': matchSchedule,
  '100year': hundredYearSchedule,
};

const getSeasonInfo = (seasonKey) => {
  return seasonOptions.find((season) => season.key === seasonKey) || seasonOptions[0];
};

const getSeasonSchedule = (seasonKey) => {
  return seasonSchedules[seasonKey] || matchSchedule;
};
const getRecordSeason = (record) => {
  return record?.draftData?.season || record?.season || '2026-27';
};

const normalizeDate = (date) => {
  return String(date || '').replaceAll('.', '-').replaceAll('/', '-');
};

const getScheduleMatchFromRecord = (record) => {
  const data = record.draftData || {};

  const recordedSeason = data.season || record.season || '2026-27';
  const targetSchedule = getSeasonSchedule(recordedSeason);

  const recordedSection = data.matchSection || record.matchSection;
  const recordedDate = normalizeDate(data.date || record.date);
  const recordedOpponent = data.opponent || record.opponent;

  if (recordedSection) {
    const matchBySection = targetSchedule.find(
      (match) => String(match.section) === String(recordedSection)
    );

    if (matchBySection) return matchBySection;
  }

  return targetSchedule.find((match) => {
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
  { name: '水戸ホーリーホック', short: '水戸', main: '#2563eb', sub: '#facc15', stadium: '水戸信用金庫スタジアム' },
  { name: '浦和レッズ', short: '浦和', main: '#dc2626', sub: '#111827', stadium: '埼玉スタジアム2002' },
  { name: 'ジェフユナイテッド千葉', short: '千葉', main: '#facc15', sub: '#16a34a', stadium: 'フクダ電子アリーナ' },
  { name: '柏レイソル', short: '柏', main: '#facc15', sub: '#111827', stadium: '三協フロンテア柏スタジアム' },
  { name: 'FC東京', short: 'FC東京', main: '#1e3a8a', sub: '#dc2626', stadium: '味の素スタジアム' },
  { name: '東京ヴェルディ', short: '東京V', main: '#15803d', sub: '#111827', stadium: '味の素スタジアム' },
  { name: 'FC町田ゼルビア', short: '町田', main: '#1d4ed8', sub: '#111827', stadium: '町田GIONスタジアム' },
  { name: '川崎フロンターレ', short: '川崎F', main: '#38bdf8', sub: '#111827', stadium: 'Uvanceとどろきスタジアム by Fujitsu' },
  { name: '横浜F・マリノス', short: '横浜FM', main: '#1d4ed8', sub: '#dc2626', stadium: '日産スタジアム' },
  { name: '清水エスパルス', short: '清水', main: '#f97316', sub: '#2563eb', stadium: 'IAIスタジアム日本平' },
  { name: '名古屋グランパス', short: '名古屋', main: '#dc2626', sub: '#f97316', stadium: 'パロマ瑞穂スタジアム' },
  { name: '京都サンガF.C.', short: '京都', main: '#6d28d9', sub: '#dc2626', stadium: 'サンガスタジアム by KYOCERA' },
  { name: 'ガンバ大阪', short: 'G大阪', main: '#1d4ed8', sub: '#111827', stadium: 'パナソニック スタジアム 吹田' },
  { name: 'サンフレッチェ広島', short: '広島', main: '#4b1c89', sub: '#f1f1f1', stadium: 'エディオンピースウイング広島' },
  { name: 'ヴィッセル神戸', short: '神戸', main: '#8f2424', sub: '#111827', stadium: 'ノエビアスタジアム神戸' },
  { name: 'ファジアーノ岡山', short: '岡山', main: '#9e223d', sub: '#2563eb', stadium: 'JFE晴れの国スタジアム' },
  { name: 'アビスパ福岡', short: '福岡', main: '#1e3a8a', sub: '#9ca3af', stadium: 'ベスト電器スタジアム' },
  { name: 'V・ファーレン長崎', short: '長崎', main: '#2563eb', sub: '#f97316', stadium: 'PEACE STADIUM Connected by SoftBank' },
];
const stadiumImages = {
  'エディオンピースウイング広島':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/%E3%82%A8%E3%83%87%E3%82%A3%E3%82%AA%E3%83%B3%E3%83%94%E3%83%BC%E3%82%B9%E3%82%A6%E3%82%A4%E3%83%B3%E3%82%B0%E5%BA%83%E5%B3%B6.jpg/1920px-%E3%82%A8%E3%83%87%E3%82%A3%E3%82%AA%E3%83%B3%E3%83%94%E3%83%BC%E3%82%B9%E3%82%A6%E3%82%A4%E3%83%B3%E3%82%B0%E5%BA%83%E5%B3%B6.jpg',

  'メルカリスタジアム':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Kashima_Stadium_1.JPG/1920px-Kashima_Stadium_1.JPG',

  '水戸信用金庫スタジアム':
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

  'パロマ瑞穂スタジアム':
    'https://corp.mizuno.com/sites/corp/files/2026-04/cc_newsrelease_260414_img02.jpg',

  'サンガスタジアム by KYOCERA':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Sanga_stadium_by_kyocera05.jpg/1920px-Sanga_stadium_by_kyocera05.jpg',

  'パナソニック スタジアム 吹田':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/%E3%83%91%E3%83%8A%E3%82%BD%E3%83%8B%E3%83%83%E3%82%AF%E3%82%B9%E3%82%BF%E3%82%B8%E3%82%A2%E3%83%A0%E5%90%B9%E7%94%B0_2023%E5%B9%B45%E6%9C%883%E6%97%A5%E3%82%BB%E3%83%AC%E3%83%83%E3%82%BD%E5%A4%A7%E9%98%AA%E6%88%A6.jpg/1920px-%E3%83%91%E3%83%8A%E3%82%BD%E3%83%8B%E3%83%83%E3%82%AF%E3%82%B9%E3%82%BF%E3%82%B8%E3%82%A2%E3%83%A0%E5%90%B9%E7%94%B0_2023%E5%B9%B45%E6%9C%883%E6%97%A5%E3%82%BB%E3%83%AC%E3%83%83%E3%82%BD%E5%A4%A7%E9%98%AA%E6%88%A6.jpg',

  'YANMAR HANASAKA STADIUM':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/NagaiBallField220226.jpg/1280px-NagaiBallField220226.jpg',

  'ノエビアスタジアム神戸':
    'https://upload.wikimedia.org/wikipedia/commons/5/57/Inside_View_of_Kobe_Wing_Stadium.jpg',

  'JFE晴れの国スタジアム':
    'https://upload.wikimedia.org/wikipedia/commons/8/81/Momotaro_Stadium_01.jpg',

  'ベスト電器スタジアム':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Best_denki_stadium02.jpg/1280px-Best_denki_stadium02.jpg',

  'PEACE STADIUM Connected by SoftBank':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/PEACE-STADIUM-Connected-by-SoftBank_6-Oct-2024.jpg/1280px-PEACE-STADIUM-Connected-by-SoftBank_6-Oct-2024.jpg',

  'MUFGスタジアム':
    'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=600&q=80',
  '未定':
    'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=600&q=80',

  default:
    'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=600&q=80',
};


const cerezoHomeSeatGroups = [
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
      'セレッソサポーターシート',
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
  if (stadium === 'YANMAR HANASAKA STADIUM') {
    return cerezoHomeSeatGroups;
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
  // GK
  { name: '福井 光輝', number: '1', position: 'GK' },
  { name: '中村 航輔', number: '23', position: 'GK' },
  { name: 'イシボウ 拳', number: '46', position: 'GK' },

  // DF
  { name: '中村 拓海', number: '2', position: 'DF' },
  { name: '田中 隼人', number: '3', position: 'DF' },
  { name: '井上 黎生人', number: '4', position: 'DF' },
  { name: '登里 享平', number: '6', position: 'DF' },
  { name: '奥田 勇斗', number: '16', position: 'DF' },
  { name: 'ディオン クールズ', number: '27', position: 'DF' },
  { name: 'エゼモクエ チメヅエ海', number: '43', position: 'DF' },
  { name: '畠中 槙之輔', number: '44', position: 'DF' },
  { name: '大畑 歩夢', number: '66', position: 'DF' },
  { name: '鷹啄 トラビス', number: '97', position: 'DF' },

  // MF
  { name: '喜田 陽', number: '5', position: 'MF' },
  { name: '上門 知樹', number: '7', position: 'MF' },
  { name: '香川 真司', number: '8', position: 'MF' },
  { name: '田中 駿汰', number: '10', position: 'MF' },
  { name: '横山 夢樹', number: '14', position: 'MF' },
  { name: '阪田 澪哉', number: '17', position: 'MF' },
  { name: '石渡 ネルソン', number: '18', position: 'MF' },
  { name: '本間 至恩', number: '19', position: 'MF' },
  { name: '久保 瑛史', number: '26', position: 'MF' },
  { name: '大迫 塁', number: '34', position: 'MF' },
  { name: '吉野 恭平', number: '35', position: 'MF' },
  { name: '塩尻 哲平', number: '42', position: 'MF' },
  { name: '柴山 昌也', number: '48', position: 'MF' },
  { name: 'ルーカス フェルナンデス', number: '77', position: 'MF' },

  // FW
  { name: '櫻川 ソロモン', number: '9', position: 'FW' },
  { name: 'チアゴ アンドラーデ', number: '11', position: 'FW' },
  { name: '金本 毅騎', number: '39', position: 'FW' },
  { name: '永添 航輝', number: '45', position: 'FW' },
  { name: 'クシーニー イェンギ', number: '99', position: 'FW' },

];

const getSeasonPlayerOptions = (seasonKey = '2026-27') => {
  return playerOptions.filter((player) => {
    if (!player.seasons) return true;
    return player.seasons.includes(seasonKey);
  });
};


export default function App() {
  const [view, setView] = useState('home');
  const [saveMessage, setSaveMessage] = useState('');
  const [todayKey, setTodayKey] = useState(() =>
    new Date().toISOString().slice(0, 10)
  );
  const [records, setRecords] = useState(() => {
    try {
      const storedRecords = localStorage.getItem('cerezo-log-records');
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
      const storedProfile = localStorage.getItem('cerezo-log-profile');
      return storedProfile ? JSON.parse(storedProfile) : defaultProfile;
    } catch {
      return defaultProfile;
    }
  });
  useEffect(() => {
    localStorage.setItem('cerezo-log-profile', JSON.stringify(profile));
  }, [profile]);

  const [savedDraft, setSavedDraft] = useState(() => {
    try {
      const storedDraft = localStorage.getItem('cerezo-log-draft');
      return storedDraft ? JSON.parse(storedDraft) : null;
    } catch {
      return null;
    }
  });
  useEffect(() => {
    localStorage.setItem('cerezo-log-records', JSON.stringify(records));
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

    localStorage.setItem('cerezo-log-draft', JSON.stringify(draftToSave));
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
    localStorage.removeItem('cerezo-log-draft');
    setSavedDraft(null);
  };
  const handleSave = () => {
    const savedRecord = {
      id: editingRecordId || Date.now(),
      season: draft.season || '2026-27',
      date: draft.date.replaceAll('-', '.'),
      opponent: draft.opponent,
      score: `セレッソ大阪 ${draft.homeScore} - ${draft.awayScore} ${draft.opponent}`,
      stadium: draft.stadium,
      // ★修正：「一人」の時は「一人で観戦」、空の場合は空文字、それ以外は「〜と観戦」にする
      companion: draft.companion === '一人'
        ? '一人で観戦'
        : (draft.companion ? `${draft.companion}と観戦` : ''),
      tag: draft.tags[0] || (draft.isQuick ? 'クイック記録' : '観戦記録'),
      img: getStadiumImage(draft.stadium),
      favorite: false,
      draftData: {
        ...draft,
        memo: draft.memo || draft.quickMemo || '',
      },
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

    localStorage.removeItem('cerezo-log-draft');
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
        {view === 'tickets' && (
          <TicketCollectionView
            records={records}
            setView={setView}
            onOpenDetail={openRecordDetail}
          />
        )}

        {view === 'explore' && (
          <StadiumExploreView
            records={records}
            setView={setView}
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

        {view === 'shareCard' && selectedRecord && (
          <ShareCardView
            record={records.find((record) => record.id === selectedRecord.id) || selectedRecord}
            setView={setView}
            backTo="recordDetail"
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

        {view === 'quickRecord' && (
          <QuickRecordView
            setView={setView}
            draft={draft}
            updateDraft={updateDraft}
            onSave={handleSave}
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

function BrandHeader({ back, setView = () => { }, records }) {
  const [noticeOpen, setNoticeOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const headerRecords =
    records ??
    (() => {
      try {
        const storedRecords = localStorage.getItem('cerezo-log-records');
        return storedRecords ? JSON.parse(storedRecords) : [];
      } catch {
        return [];
      }
    })();

  const nextMatch = getNextMatch(headerRecords);


  const movePage = (page) => {
    setView(page);
    setMenuOpen(false);
    setNoticeOpen(false);
  };

  return (
    <header className="relative h-[85px] bg-[#831843] text-white z-[60] shadow-lg shadow-pink-900/30 overflow-visible border-b-[3px] border-[#d6b36a]/60">
      {/* 背景グラデーション */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#be185d] via-[#831843] to-[#92400e]"></div>

      {/* うっすら光 */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_42%_42%,rgba(255,255,255,0.16),transparent_22%),radial-gradient(circle_at_82%_70%,rgba(214,179,106,0.13),transparent_14%)]"></div>

      {/* 左の斜め装飾：薄め */}
      <div className="absolute -left-12 top-0 h-full w-20 skew-x-[-28deg] bg-white/8"></div>
      <div className="absolute left-4 top-0 h-full w-1.5 skew-x-[-28deg] bg-[#d6b36a]/28"></div>
      <div className="absolute left-10 top-0 h-full w-14 skew-x-[-28deg] bg-pink-300/8"></div>

      {/* 右の斜め装飾：薄め */}
      <div className="absolute -right-10 top-0 h-full w-24 skew-x-[-30deg] bg-pink-300/8"></div>
      <div className="absolute right-8 top-0 h-full w-1.5 skew-x-[-30deg] bg-[#d6b36a]/28"></div>
      <div className="absolute right-16 top-0 h-full w-px skew-x-[-30deg] bg-white/12"></div>

      {/* 下の金ライン */}
      <div className="absolute left-0 right-0 bottom-0 h-[3px] bg-gradient-to-r from-pink-500 via-[#d6b36a] to-pink-600"></div>
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
                CEREZO
              </span>

              <span
                className="text-[25px] italic font-black tracking-[-0.08em] text-[#d6b36a] drop-shadow-[0_4px_10px_rgba(0,0,0,0.35)]"
                style={{ fontFamily: "'Brush Script MT', 'Segoe Script', cursive" }}
              >
                log
              </span>
            </div>

            <div className="mt-1 flex items-center gap-2">
              <div className="h-px w-16 bg-[#d6b36a]/70"></div>
              <div className="text-[#d6b36a] text-[10px] leading-none">✦</div>
              <div className="h-px w-16 bg-[#d6b36a]/70"></div>
            </div>

            <div className="mt-1 text-[7px] font-bold tracking-[0.24em] text-white/80 whitespace-nowrap">
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
            <div className="font-black text-[#ec4899] flex items-center gap-2">
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
              className="w-full text-left bg-pink-50 hover:bg-pink-100 transition rounded-2xl p-3 border border-pink-100 active:scale-[0.98]"
            >
              <div className="flex items-center justify-between">
                <div className="text-xs font-black text-[#ec4899]">
                  次の試合
                </div>
                <ChevronRight size={14} className="text-[#ec4899]" />
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
                      ? 'bg-pink-100 text-[#ec4899]'
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
              <div className="text-xs font-black text-[#ec4899]">
                CEREZO LOG
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
              icon={<Ticket size={18} />}
              label="チケットコレクション"
              onClick={() => movePage('tickets')}
            />

            <HeaderMenuItem
              icon={<MapPin size={18} />}
              label="スタジアム探検"
              onClick={() => movePage('explore')}
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
      className="w-full flex items-center gap-3 bg-[#f8f7fb] hover:bg-pink-50 rounded-2xl p-3 text-left border border-gray-100 transition"
    >
      <div className="w-10 h-10 rounded-xl bg-white text-[#ec4899] flex items-center justify-center shadow-sm shrink-0">
        {icon}
      </div>

      <div className="flex-1 font-black text-sm text-[#171425]">
        {label}
      </div>

      <ChevronRight size={18} className="text-gray-400" />
    </button>
  );
}

const stadiumExploreData = [

  {
    name: '埼玉スタジアム2002',
    short: '埼スタ',
    prefecture: '埼玉県さいたま市',
    x: 63,
    y: 49,
    type: 'away',
    league: 'J1',
  },
  {
    name: '三協フロンテア柏スタジアム',
    short: '柏',
    prefecture: '千葉県柏市',
    x: 63,
    y: 60,
    type: 'away',
    league: 'J1',
  },
  {
    name: '味の素スタジアム',
    short: '味スタ',
    prefecture: '東京都調布市',
    x: 60,
    y: 53,
    type: 'away',
    league: 'J1',
  },
  {
    name: '国立競技場',
    short: '国立',
    prefecture: '東京都新宿区',
    x: 63,
    y: 54,
    type: 'away',
    league: 'J1',
  },
  {
    name: '町田GIONスタジアム',
    short: '町田GION',
    prefecture: '東京都町田市',
    x: 58,
    y: 56,
    type: 'away',
    league: 'J1',
  },
  {
    name: '日産スタジアム',
    short: '日産',
    prefecture: '神奈川県横浜市',
    x: 61,
    y: 58,
    type: 'away',
    league: 'J1',
  },
  {
    name: 'Uvanceとどろきスタジアム by Fujitsu',
    short: '等々力',
    prefecture: '神奈川県川崎市',
    x: 60,
    y: 56,
    type: 'away',
    league: 'J1',
  },
  {
    name: 'IAIスタジアム日本平',
    short: '日本平',
    prefecture: '静岡県静岡市',
    x: 55,
    y: 61,
    type: 'away',
    league: 'J1',
  },
  {
    name: 'パロマ瑞穂スタジアム',
    short: '瑞穂',
    prefecture: '愛知県名古屋市',
    x: 48,
    y: 62,
    type: 'away',
    league: 'J1',
  },
  {
    name: 'パナソニック スタジアム 吹田',
    short: 'パナスタ',
    prefecture: '大阪府吹田市',
    x: 39,
    y: 66,
    type: 'away',
    league: 'J1',
  },
  {
    name: 'YANMAR HANASAKA STADIUM',
    short: 'ヤンスタ',
    prefecture: '大阪府大阪市',
    x: 38,
    y: 68,
    type: 'home',
    league: 'J1',
    featured: true,
  },
  {
    name: 'ノエビアスタジアム神戸',
    short: 'ノエスタ',
    prefecture: '兵庫県神戸市',
    x: 35,
    y: 64,
    type: 'away',
    league: 'J1',
  },
  {
    name: 'サンガスタジアム by KYOCERA',
    short: 'サンガS',
    prefecture: '京都府亀岡市',
    x: 36,
    y: 60,
    type: 'away',
    league: 'J1',
  },
  {
    name: 'JFE晴れの国スタジアム',
    short: '岡山',
    prefecture: '岡山県岡山市',
    x: 30,
    y: 63,
    type: 'away',
    league: 'J1',
  },
  {
    name: 'エディオンピースウイング広島',
    short: 'Eピース',
    prefecture: '広島県広島市',
    x: 25,
    y: 65,
    type: 'away',
    league: 'J1',
  },
  {
    name: 'ベスト電器スタジアム',
    short: 'ベススタ',
    prefecture: '福岡県福岡市',
    x: 12,
    y: 67,
    type: 'away',
    league: 'J1',
  },
  {
    name: 'PEACE STADIUM Connected by SoftBank',
    short: '長崎',
    prefecture: '長崎県長崎市',
    x: 8,
    y: 73,
    type: 'away',
    league: 'J1',
  },
];

const getRecordStadiumName = (record) => {
  return record?.draftData?.stadium || record?.stadium || '';
};

const getRecordPhotos = (record) => {
  return record?.draftData?.photos || [];
};

const getRecordScorersText = (record) => {
  const scorers = record?.draftData?.scorers || [];

  if (!scorers.length) return '得点者なし';

  return scorers
    .map((scorer) => {
      if (typeof scorer === 'string') return scorer;
      return scorer.name || scorer.player || scorer.scorer || '';
    })
    .filter(Boolean)
    .join('、') || '得点者なし';
};

const getMemoryResult = (record) => {
  if (!record) return null;

  const data = record.draftData || {};

  const cerezoScore = Number(data.homeScore ?? 0);
  const opponentScore = Number(data.awayScore ?? 0);

  if (cerezoScore > opponentScore) return 'win';
  if (cerezoScore === opponentScore) return 'draw';
  return 'lose';
};

const getMemoryResultLabel = (result) => {
  if (result === 'win') return 'WIN';
  if (result === 'draw') return 'DRAW';
  if (result === 'lose') return 'LOSE';
  return 'NO DATA';
};

const getMemoryResultText = (result) => {
  if (result === 'win') return '勝利の記憶';
  if (result === 'draw') return '引き分けの記憶';
  if (result === 'lose') return '悔しさの記憶';
  return 'まだ記録なし';
};

const sortRecordsByDateDesc = (records = []) => {
  const getRecordSortTime = (record) => {
    const idTime = Number(record?.id);

    if (Number.isFinite(idTime) && idTime > 100000000000) {
      return idTime;
    }

    const normalizedDate = String(record?.draftData?.date || record?.date || '')
      .replaceAll('.', '-')
      .replaceAll('/', '-');
    const dateTime = new Date(normalizedDate).getTime();

    return Number.isFinite(dateTime) ? dateTime : 0;
  };

  return [...records].sort((a, b) => getRecordSortTime(b) - getRecordSortTime(a));
};

function StadiumExploreView({ records, setView }) {
  const [filter, setFilter] = useState('home');
  const [query, setQuery] = useState('');
  const [noticeOpen, setNoticeOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [exploreMenuOpen, setExploreMenuOpen] = useState(false);
  const [listOpen, setListOpen] = useState(false);
  const [mapZoom, setMapZoom] = useState(100);
  const [mapMode, setMapMode] = useState('home');

  const [selectedStadium, setSelectedStadium] = useState(null);

  const zoomOut = () => {
    setMapZoom((current) => Math.max(80, current - 10));
  };

  const zoomIn = () => {
    setMapZoom((current) => Math.min(140, current + 10));
  };

  const resetZoom = () => {
    setMapZoom(100);
  };

  const [memoryIndex, setMemoryIndex] = useState(0);

  const memoriesByStadium = records.reduce((acc, record) => {
    const stadiumName = getRecordStadiumName(record);

    if (!stadiumName) return acc;

    if (!acc[stadiumName]) {
      acc[stadiumName] = [];
    }

    acc[stadiumName].push(record);
    return acc;
  }, {});

  const decoratedStadiums = stadiumExploreData.map((stadium) => {
    const memories = sortRecordsByDateDesc(memoriesByStadium[stadium.name] || []);
    const latestMemory = memories[0] || null;
    const result = getMemoryResult(latestMemory);

    return {
      ...stadium,
      memories,
      latestMemory,
      visitCount: memories.length,
      visited: memories.length > 0,
      favorite: memories.some((record) => record.favorite),
      hasPhoto: memories.some((record) => getRecordPhotos(record).length > 0),
      result,
    };
  });

  const filteredStadiums = decoratedStadiums.filter((stadium) => {
    const keyword = query.trim().toLowerCase();

    const matchesQuery =
      !keyword ||
      stadium.name.toLowerCase().includes(keyword) ||
      stadium.short.toLowerCase().includes(keyword) ||
      stadium.prefecture.toLowerCase().includes(keyword);

    const matchesFilter =
      filter === 'all' ||
      (filter === 'memory' && stadium.visited) ||
      (filter === 'home' && stadium.type === 'home') ||
      (filter === 'away' && stadium.type === 'away') ||
      (filter === 'visited' && stadium.visited) ||
      (filter === 'favorite' && stadium.favorite);

    return matchesQuery && matchesFilter;
  });

  const visitedCount = decoratedStadiums.filter((stadium) => stadium.visited).length;
  const totalCount = decoratedStadiums.length;
  const unvisitedCount = totalCount - visitedCount;

  const nextMatch = getNextMatch(records);

  const recommendStadium =
    decoratedStadiums.find((stadium) => stadium.name === nextMatch?.stadium) ||
    decoratedStadiums.find((stadium) => stadium.featured) ||
    decoratedStadiums[0];

  const latestRecordedStadiumName = getRecordStadiumName(records[0]);
  const latestRecordedStadium =
    decoratedStadiums.find((stadium) => stadium.name === latestRecordedStadiumName) || null;

  const selectedCandidate =
    decoratedStadiums.find((stadium) => stadium.name === selectedStadium?.name) ||
    latestRecordedStadium ||
    recommendStadium;

  const selected =
    filteredStadiums.find((stadium) => stadium.name === selectedCandidate?.name) ||
    filteredStadiums[0] ||
    selectedCandidate ||
    decoratedStadiums[0];


  const selectedMemories = selected?.memories || [];
  const shownMemory = selectedMemories[memoryIndex] || null;
  const shownMemoryData = shownMemory?.draftData || {};
  const shownResult = getMemoryResult(shownMemory);

  useEffect(() => {
    setMemoryIndex(0);
  }, [selected?.name]);

  return (
    <div className="sanf-explore">
      <ExploreStyleHelper />

      <div className="explore-orb explore-orb-one"></div>
      <div className="explore-orb explore-orb-two"></div>

      <div className="explore-topbar">
        <button
          type="button"
          onClick={() => setView('home')}
          className="explore-icon-button"
          aria-label="ホームに戻る"
        >
          <ChevronLeft size={22} />
        </button>

        <div className="explore-top-title">
          <div>CEREZO</div>
          <span>STADIUM EXPLORE</span>
        </div>

        <div className="explore-top-actions">
          <button
            type="button"
            className="explore-icon-button"
            onClick={() => {
              setNoticeOpen((current) => !current);
              setProfileOpen(false);
              setExploreMenuOpen(false);
            }}
            aria-label="お知らせ"
          >
            <Bell size={19} />
            <span className="explore-dot"></span>
          </button>

          <button
            type="button"
            className="explore-icon-button"
            onClick={() => {
              setProfileOpen((current) => !current);
              setNoticeOpen(false);
              setExploreMenuOpen(false);
            }}
            aria-label="プロフィールメニュー"
          >
            <User size={19} />
          </button>
        </div>

        {noticeOpen && (
          <div className="explore-popover explore-popover-right">
            <div className="explore-popover-kicker">
              NEXT MATCH
            </div>

            <div className="explore-popover-title">
              {nextMatch
                ? `${nextMatch.displayDate} vs ${nextMatch.opponent}`
                : '次の試合は未定'}
            </div>

            <div className="explore-popover-text">
              {nextMatch
                ? `${nextMatch.time} / ${nextMatch.stadium}`
                : '試合予定が入ると、ここに次の遠征先が表示されます。'}
            </div>

            {recommendStadium && (
              <button
                type="button"
                className="explore-popover-button"
                onClick={() => {
                  setSelectedStadium(recommendStadium);
                  setNoticeOpen(false);
                }}
              >
                地図で見る
                <ChevronRight size={15} />
              </button>
            )}
          </div>
        )}

        {profileOpen && (
          <div className="explore-popover explore-popover-right">
            <div className="explore-popover-kicker">
              MY CEREZO LOG
            </div>

            <div className="explore-popover-title">
              記憶マップメニュー
            </div>

            <div className="explore-popover-menu">
              <button type="button" onClick={() => setView('mypage')}>
                <User size={15} />
                マイページ
              </button>

              <button type="button" onClick={() => setView('records')}>
                <List size={15} />
                記録一覧
              </button>

              <button type="button" onClick={() => setView('stats')}>
                <BarChart2 size={15} />
                統計
              </button>

              <button type="button" onClick={() => setView('tickets')}>
                <Ticket size={15} />
                チケット
              </button>
            </div>
          </div>
        )}
      </div>

      <section className="explore-panel">
        <div className="explore-brand-row">
          <button
            type="button"
            className="explore-crest"
            onClick={() => {
              setExploreMenuOpen((current) => !current);
              setNoticeOpen(false);
              setProfileOpen(false);
            }}
            aria-label="遠征メニューを開く"
          >
            <span>三</span>
          </button>

          <div>
            <h1>
              CEREZO
              <br />
              <span>EXPLORE</span>
            </h1>
            <p>桜色の記憶をたどるスタジアム探検</p>
          </div>
        </div>

        {exploreMenuOpen && (
          <div className="explore-action-menu">
            <div className="explore-action-menu-head">
              <span>SAKURA EXPEDITION</span>
              <strong>遠征メニュー</strong>
            </div>

            <div className="explore-action-menu-grid">
              <button
                type="button"
                onClick={() => {
                  setSelectedStadium(recommendStadium);
                  const nextFilter = recommendStadium?.type === 'home' ? 'home' : 'away';
                  setFilter(nextFilter);
                  setMapMode(nextFilter);
                  setExploreMenuOpen(false);
                }}
              >
                <MapPin size={16} />
                次の遠征先
              </button>

              <button
                type="button"
                onClick={() => {
                  setView('step1');
                }}
              >
                <Plus size={16} />
                観戦記録
              </button>

              <button
                type="button"
                onClick={() => {
                  setView('records');
                }}
              >
                <List size={16} />
                記録一覧
              </button>

              <button
                type="button"
                onClick={() => {
                  setView('stats');
                }}
              >
                <BarChart2 size={16} />
                統計
              </button>
            </div>
          </div>
        )}

        <div className="explore-team-pill">セレッソ大阪</div>

        <div className="explore-chip-row">
          <ExploreChip
            active={filter === 'home'}
            onClick={() => {
              setFilter('home');
              setMapMode('home');
              setListOpen(false);
            }}
          >
            ホーム
          </ExploreChip>

          <ExploreChip
            active={filter === 'away'}
            onClick={() => {
              setFilter('away');
              setMapMode('away');
              setListOpen(false);
            }}
          >
            アウェイ
          </ExploreChip>

          <ExploreChip
            active={filter === 'favorite'}
            onClick={() => {
              setFilter('favorite');
              setMapMode('favorite');
              setListOpen(false);
            }}
          >
            お気に入り
          </ExploreChip>
        </div>

        <div className="explore-legend">
          <span>
            <i className="legend-dot visited"></i>
            訪問済み
          </span>
          <span>
            <i className="legend-dot unvisited"></i>
            未訪問
          </span>
          <button type="button" onClick={() => setFilter('favorite')}>
            <Star size={14} />
            お気に入り
          </button>
        </div>

        <label className="explore-search">
          <MapPin size={17} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="スタジアムを検索"
          />
        </label>

        <div className="explore-stat-grid">
          <ExploreStat label="訪問" value={visitedCount} total={totalCount} />
          <ExploreStat label="未訪問" value={unvisitedCount} total={totalCount} />
        </div>

      </section>

      <section className="explore-map-card">
        <div className="explore-map-header">
          <div>
            <span>NATIONAL STADIUM MAP</span>
            <strong>全国スタジアム探索</strong>
          </div>

          <div className="explore-map-count">
            {filteredStadiums.length}
            <small>spots</small>
          </div>
        </div>

        <div className="explore-map">
          <div
            className="explore-map-inner"
            style={{
              transform: `scale(${mapZoom / 100})`,
            }}
          >
            <img
              src="/japan-map-neon.png"
              alt="日本地図"
              className="explore-map-image"
            />

            <svg className="explore-route-layer" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="sanfRoute" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#ec4899" />
                  <stop offset="45%" stopColor="#be185d" />
                  <stop offset="100%" stopColor="#d6b36a" />
                </linearGradient>
              </defs>

              <path
                d="M76 9 C68 24, 65 38, 63 49 C58 59, 47 62, 39 66 C32 70, 26 71, 22 72 C18 76, 15 80, 9 88"
                fill="none"
                stroke="url(#sanfRoute)"
                strokeWidth="0.55"
                strokeLinecap="round"
                opacity="0.9"
              />

              <path
                d="M22 72 C36 63, 48 54, 63 54 C68 55, 70 58, 74 63"
                fill="none"
                stroke="#f9a8d4"
                strokeWidth="0.35"
                strokeLinecap="round"
                opacity="0.55"
              />
            </svg>

            {Array.from({ length: 34 }).map((_, index) => (
              <span
                key={index}
                className="explore-tiny-light"
                style={{
                  left: `${8 + ((index * 23) % 82)}%`,
                  top: `${8 + ((index * 37) % 84)}%`,
                  animationDelay: `${index * 0.16}s`,
                }}
              />
            ))}

            {filteredStadiums.map((stadium) => (
              <StadiumNode
                key={stadium.name}
                stadium={stadium}
                active={selected?.name === stadium.name}
                onClick={() => setSelectedStadium(stadium)}
              />
            ))}
          </div>

          <div className="explore-compass">
            <span>N</span>
            <MapPin size={22} fill="currentColor" />
          </div>
        </div>
      </section>


      <section className="explore-control-bar explore-control-between">
        <button
          type="button"
          onClick={() => {
            setSelectedStadium(recommendStadium);
            setListOpen(false);
          }}
          aria-label="次の試合会場へ移動"
        >
          <MapPin size={18} />
        </button>

        <div className="explore-zoom">
          <button type="button" onClick={zoomOut}>
            −
          </button>

          <strong onClick={resetZoom} role="button" tabIndex={0}>
            {mapZoom}%
          </strong>

          <button type="button" onClick={zoomIn}>
            ＋
          </button>
        </div>

        <button
          type="button"
          className="explore-list-toggle"
          onClick={() => setListOpen((current) => !current)}
        >
          <List size={17} />
          {listOpen ? '閉じる' : 'リスト'}
        </button>
      </section>

      {listOpen && (
        <section className="explore-list-panel">
          <div className="explore-list-header">
            <div>
              <span>スタジアムリスト</span>
              <strong>{filteredStadiums.length}件</strong>
            </div>

            <button type="button" onClick={() => setListOpen(false)}>
              閉じる
            </button>
          </div>

          <div className="explore-list-items">
            {filteredStadiums.map((stadium) => (
              <button
                key={stadium.name}
                type="button"
                onClick={() => {
                  setSelectedStadium(stadium);
                  setListOpen(false);
                }}
                className={selected?.name === stadium.name ? 'active' : ''}
              >
                <div>
                  <strong>{stadium.name}</strong>
                  <span>{stadium.prefecture}</span>
                </div>

                <small>
                  {stadium.favorite ? 'お気に入り' : stadium.visited ? '訪問済み' : stadium.type === 'home' ? 'ホーム' : 'アウェイ'}
                </small>
              </button>
            ))}
          </div>
        </section>
      )}

      <section className={`explore-memory-card memory-${shownResult || 'none'}`}>
        <div className="memory-photo-wrap">
          <img
            src={
              getRecordPhotos(shownMemory)[0] ||
              getStadiumImage(selected.name)
            }
            alt={selected.name}
          />

          <div className="memory-result-badge">
            {getMemoryResultLabel(shownResult)}
          </div>
        </div>

        <div className="memory-info">
          <div className="memory-kicker">
            {shownMemory ? getMemoryResultText(shownResult) : 'NO MEMORY YET'}
          </div>

          <h2>{selected.name}</h2>
          <p>{selected.prefecture}</p>

          {shownMemory ? (
            <>
              <div className="memory-score">
                <span>{shownMemory.date}</span>
                <strong>
                  セレッソ大阪 {shownMemoryData.homeScore} - {shownMemoryData.awayScore} {shownMemoryData.opponent || shownMemory.opponent}
                </strong>
              </div>

              <div className="memory-mini-grid">
                <div>
                  <span>対戦相手</span>
                  <strong>{shownMemoryData.opponent || shownMemory.opponent || '-'}</strong>
                </div>

                <div>
                  <span>MVP</span>
                  <strong>{shownMemoryData.mvp || '-'}</strong>
                </div>

                <div>
                  <span>一緒に観戦</span>
                  <strong>{shownMemory.companion || shownMemoryData.companion || '-'}</strong>
                </div>

                <div>
                  <span>得点者</span>
                  <strong>{getRecordScorersText(shownMemory)}</strong>
                </div>
              </div>

              {shownMemoryData.memo && (
                <div className="memory-memo">
                  {shownMemoryData.memo}
                </div>
              )}

              {selectedMemories.length > 1 && (
                <div className="memory-switcher">
                  <button
                    type="button"
                    onClick={() =>
                      setMemoryIndex((current) =>
                        current === 0 ? selectedMemories.length - 1 : current - 1
                      )
                    }
                  >
                    前の記憶
                  </button>

                  <span>
                    {memoryIndex + 1} / {selectedMemories.length}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setMemoryIndex((current) =>
                        current === selectedMemories.length - 1 ? 0 : current + 1
                      )
                    }
                  >
                    次の記憶
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="memory-empty">
              まだこのスタジアムの観戦記録はありません。
              <br />
              いつか訪れたら、ここに桜色の記憶が残ります。
            </div>
          )}
        </div>
      </section>

      <nav className="explore-bottom-nav">
        <button type="button" className="active">
          <MapPin size={19} />
          探検
        </button>
        <button type="button" onClick={() => setView('home')}>
          <Home size={19} />
          ホーム
        </button>
        <button type="button" onClick={() => setView('records')}>
          <Ticket size={19} />
          記録
        </button>
        <button type="button" onClick={() => setView('stats')}>
          <Trophy size={19} />
          統計
        </button>
      </nav>
    </div>
  );
}

function ExploreChip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={active ? 'explore-chip active' : 'explore-chip'}
    >
      {children}
    </button>
  );
}

function ExploreStat({ label, value, total }) {
  return (
    <div className="explore-stat">
      <span>{label}</span>
      <strong>{value}</strong>
      <small>/ {total}</small>
    </div>
  );
}

function StadiumNode({ stadium, active, onClick }) {
  const nodeClass = [
    'explore-node',
    stadium.visited ? 'visited' : 'unvisited',
    stadium.featured ? 'featured' : '',
    stadium.favorite ? 'favorite' : '',
    stadium.hasPhoto ? 'has-photo' : '',
    stadium.result ? `result-${stadium.result}` : '',
    active ? 'active' : '',
  ].join(' ');

  return (
    <button
      type="button"
      className={nodeClass}
      style={{
        left: `${stadium.x}%`,
        top: `${stadium.y}%`,
      }}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      title={stadium.name}
    >
      <span className="explore-node-core"></span>

      {stadium.visitCount > 1 && (
        <span className="explore-node-count">
          {stadium.visitCount}
        </span>
      )}

      {(stadium.featured || active) && (
        <span className="explore-node-label">
          {stadium.short}
        </span>
      )}
    </button>
  );
}

function ExploreStyleHelper() {
  return (
    <style>{`
      .sanf-explore {
        position: relative;
        min-height: 100vh;
        padding: 16px 14px 118px;
        color: white;
        overflow: hidden;
        background:
          radial-gradient(circle at 20% 12%, rgba(236, 72, 153, 0.30), transparent 30%),
          radial-gradient(circle at 78% 42%, rgba(214, 179, 106, 0.22), transparent 28%),
          linear-gradient(180deg, #03040d 0%, #0b0820 42%, #06030f 100%);
      }

      .sanf-explore::before {
        content: '';
        position: absolute;
        inset: 0;
        background-image:
          linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
        background-size: 28px 28px;
        mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent);
        pointer-events: none;
      }
        .explore-popover {
  position: absolute;
  top: 52px;
  width: 270px;
  border-radius: 22px;
  padding: 14px;
  z-index: 999;
  background: rgba(9, 6, 24, 0.96);
  border: 1px solid rgba(251,207,232,0.2);
  box-shadow: 0 22px 50px rgba(0,0,0,0.45);
  backdrop-filter: blur(18px);
}

.explore-popover-right {
  right: 0;
}

.explore-popover-kicker {
  color: #f9a8d4;
  font-size: 9px;
  letter-spacing: 0.2em;
  font-weight: 950;
}

.explore-popover-title {
  margin-top: 6px;
  color: white;
  font-size: 14px;
  line-height: 1.45;
  font-weight: 950;
}

.explore-popover-text {
  margin-top: 5px;
  color: rgba(255,255,255,0.58);
  font-size: 11px;
  line-height: 1.6;
  font-weight: 800;
}

.explore-popover-button {
  margin-top: 12px;
  width: 100%;
  height: 38px;
  border-radius: 14px;
  border: 1px solid rgba(251,207,232,0.18);
  background: rgba(236,72,153,0.18);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 950;
}

.explore-popover-menu {
  display: grid;
  gap: 8px;
  margin-top: 12px;
}

.explore-popover-menu button {
  height: 38px;
  border-radius: 14px;
  border: 1px solid rgba(251,207,232,0.13);
  background: rgba(255,255,255,0.055);
  color: white;
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 0 12px;
  font-size: 12px;
  font-weight: 950;
}

      .explore-orb {
        position: absolute;
        border-radius: 999px;
        filter: blur(30px);
        opacity: 0.55;
        pointer-events: none;
      }

      .explore-orb-one {
        width: 180px;
        height: 180px;
        left: -70px;
        top: 170px;
        background: #ec4899;
      }

      .explore-orb-two {
        width: 180px;
        height: 180px;
        right: -80px;
        top: 470px;
        background: #d6b36a;
      }

      .explore-topbar {
        position: relative;
        z-index: 120;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 14px;
      }

      .explore-icon-button {
        position: relative;
        width: 42px;
        height: 42px;
        border-radius: 16px;
        border: 1px solid rgba(216, 180, 254, 0.22);
        background: rgba(15, 12, 33, 0.72);
        color: #f5e8ff;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 12px 30px rgba(0,0,0,0.22);
      }

      .explore-dot {
        position: absolute;
        top: 9px;
        right: 9px;
        width: 7px;
        height: 7px;
        background: #ec4899;
        border-radius: 999px;
        box-shadow: 0 0 14px #ec4899;
      }

      .explore-top-title {
        text-align: center;
        line-height: 1.05;
        letter-spacing: 0.22em;
        font-weight: 900;
        font-size: 11px;
        color: rgba(255,255,255,0.9);
      }

      .explore-top-title span {
        display: block;
        margin-top: 4px;
        font-size: 8px;
        color: rgba(251,207,232,0.85);
      }

      .explore-top-actions {
        display: flex;
        gap: 8px;
      }

      .explore-panel,
      .explore-map-card,
      .explore-detail-card,
      .explore-control-bar {
        position: relative;
        z-index: 2;
        border: 1px solid rgba(216, 180, 254, 0.18);
        background: linear-gradient(180deg, rgba(16, 12, 35, 0.86), rgba(8, 6, 20, 0.74));
        backdrop-filter: blur(18px);
        box-shadow: 0 20px 50px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06);
      }

      .explore-panel {
        border-radius: 28px;
        padding: 18px;
        margin-bottom: 14px;
      }

      .explore-brand-row {
        display: flex;
        gap: 14px;
        align-items: center;
      }

      .explore-crest {
        width: 56px;
        height: 56px;
        border-radius: 18px;
        background:
          radial-gradient(circle at 50% 18%, rgba(255,255,255,0.28), transparent 24%),
          linear-gradient(160deg, #ec4899, #92400e);
        border: 1px solid rgba(251,207,232,0.42);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #f5e8ff;
        font-size: 27px;
        font-weight: 900;
        box-shadow: 0 0 26px rgba(236,72,153,0.38);
        cursor: pointer;
        padding: 0;
      }

      .explore-crest:active {
        transform: scale(0.96);
      }

      .explore-brand-row h1 {
        margin: 0;
        font-size: 28px;
        line-height: 0.95;
        letter-spacing: 0.08em;
        font-weight: 950;
        text-shadow: 0 0 18px rgba(249,168,212,0.7);
      }

      .explore-brand-row h1 span {
        font-size: 22px;
        letter-spacing: 0.34em;
        color: #e9d5ff;
      }

      .explore-brand-row p {
        margin: 8px 0 0;
        font-size: 12px;
        color: rgba(255,255,255,0.72);
        font-weight: 700;
      }

      .explore-action-menu {
        margin-top: 14px;
        border-radius: 22px;
        padding: 13px;
        border: 1px solid rgba(251,207,232,0.18);
        background: rgba(255,255,255,0.06);
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.06);
      }

      .explore-action-menu-head span {
        display: block;
        color: rgba(251,207,232,0.78);
        font-size: 9px;
        letter-spacing: 0.18em;
        font-weight: 950;
      }

      .explore-action-menu-head strong {
        display: block;
        margin-top: 4px;
        color: white;
        font-size: 15px;
        font-weight: 950;
      }

      .explore-action-menu-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 8px;
        margin-top: 11px;
      }

      .explore-action-menu-grid button {
        height: 42px;
        border-radius: 15px;
        border: 1px solid rgba(251,207,232,0.14);
        background: rgba(0,0,0,0.16);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 7px;
        font-size: 12px;
        font-weight: 950;
      }

      .explore-team-pill {
        display: inline-flex;
        margin-top: 14px;
        padding: 7px 13px;
        border-radius: 999px;
        color: #f5e8ff;
        font-size: 12px;
        font-weight: 900;
        background: rgba(126,34,206,0.28);
        border: 1px solid rgba(251,207,232,0.28);
      }

      .explore-chip-row {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 9px;
        margin-top: 15px;
      }

      .explore-chip {
        border: 1px solid rgba(251,207,232,0.18);
        background: rgba(255,255,255,0.05);
        color: rgba(255,255,255,0.68);
        border-radius: 15px;
        height: 43px;
        font-size: 13px;
        font-weight: 950;
      }

      .explore-chip.active {
        color: #fff;
        background: linear-gradient(180deg, rgba(236,72,153,0.72), rgba(214,179,106,0.72));
        border-color: rgba(251,207,232,0.55);
        box-shadow: 0 0 22px rgba(236,72,153,0.36);
      }

      .explore-legend {
        display: flex;
        align-items: center;
        gap: 14px;
        margin-top: 15px;
        color: rgba(255,255,255,0.72);
        font-size: 12px;
        font-weight: 800;
      }

      .explore-legend span,
      .explore-legend button {
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }

      .explore-legend button {
        color: rgba(255,255,255,0.72);
        background: transparent;
        border: 0;
        font-weight: 900;
      }

      .legend-dot {
        width: 12px;
        height: 12px;
        border-radius: 999px;
        display: inline-block;
      }

      .legend-dot.visited {
        background: #ec4899;
        box-shadow: 0 0 14px #ec4899;
      }

      .legend-dot.unvisited {
        background: #cbd5e1;
        opacity: 0.7;
      }

      .explore-search {
        margin-top: 15px;
        height: 48px;
        border-radius: 17px;
        border: 1px solid rgba(251,207,232,0.18);
        background: rgba(255,255,255,0.06);
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 0 14px;
        color: rgba(255,255,255,0.72);
      }

      .explore-search input {
        min-width: 0;
        flex: 1;
        background: transparent;
        border: 0;
        outline: 0;
        color: white;
        font-weight: 800;
      }

      .explore-search input::placeholder {
        color: rgba(255,255,255,0.38);
      }

      .explore-stat-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
        margin-top: 15px;
      }

      .explore-stat {
        border-radius: 18px;
        border: 1px solid rgba(251,207,232,0.14);
        background: rgba(255,255,255,0.05);
        padding: 14px;
      }

      .explore-stat span {
        display: block;
        font-size: 12px;
        color: rgba(255,255,255,0.66);
        font-weight: 900;
      }

      .explore-stat strong {
        font-size: 33px;
        color: #f9a8d4;
        line-height: 1;
        margin-top: 7px;
        display: inline-block;
        text-shadow: 0 0 18px rgba(249,168,212,0.45);
      }

      .explore-stat small {
        margin-left: 6px;
        color: rgba(255,255,255,0.45);
        font-weight: 900;
      }

      .explore-recommend {
        width: 100%;
        margin-top: 15px;
        border-radius: 19px;
        border: 1px solid rgba(251,207,232,0.14);
        background: rgba(255,255,255,0.055);
        padding: 12px;
        display: grid;
        grid-template-columns: 78px 1fr auto;
        gap: 12px;
        align-items: center;
        text-align: left;
        color: white;
      }

      .explore-recommend img {
        width: 78px;
        height: 58px;
        border-radius: 14px;
        object-fit: cover;
        filter: saturate(1.15) contrast(1.05);
      }

      .explore-recommend span {
        display: block;
        color: rgba(255,255,255,0.58);
        font-size: 11px;
        font-weight: 900;
      }

      .explore-recommend strong {
        display: block;
        margin-top: 4px;
        font-size: 14px;
        line-height: 1.35;
        font-weight: 950;
      }

      .explore-recommend small {
        display: block;
        margin-top: 4px;
        color: rgba(255,255,255,0.55);
        font-size: 10px;
        font-weight: 800;
      }

      .explore-map-card {
        border-radius: 30px;
        padding: 14px;
        margin-bottom: 14px;
      }

      .explore-map-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 8px;
      }

      .explore-map-header span {
        display: block;
        color: rgba(251,207,232,0.75);
        font-size: 9px;
        letter-spacing: 0.18em;
        font-weight: 900;
      }

      .explore-map-header strong {
        display: block;
        margin-top: 4px;
        font-size: 17px;
        font-weight: 950;
      }

      .explore-map-count {
        width: 52px;
        height: 52px;
        border-radius: 18px;
        background: rgba(126,34,206,0.32);
        border: 1px solid rgba(251,207,232,0.18);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #e9d5ff;
        font-size: 18px;
        font-weight: 950;
      }

      .explore-map-count small {
        font-size: 8px;
        color: rgba(255,255,255,0.5);
      }

      .explore-map {
        position: relative;
        height: 510px;
        border-radius: 26px;
        overflow: hidden;
        background:
          radial-gradient(circle at 23% 72%, rgba(236,72,153,0.26), transparent 16%),
          radial-gradient(circle at 68% 44%, rgba(214,179,106,0.18), transparent 18%),
          linear-gradient(180deg, rgba(8,8,26,0.96), rgba(3,4,13,0.96));
      }

      .explore-map::before {
        content: '';
        position: absolute;
        inset: 0;
        background-image:
          radial-gradient(circle, rgba(255,255,255,0.16) 1px, transparent 1.4px);
        background-size: 22px 22px;
        opacity: 0.2;
      }

      .explore-route-layer {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        filter: drop-shadow(0 0 8px rgba(236,72,153,0.9));
        z-index: 2;
      }

      

      .explore-tiny-light {
        position: absolute;
        width: 3px;
        height: 3px;
        border-radius: 999px;
        background: rgba(255,255,255,0.62);
        box-shadow: 0 0 9px rgba(255,255,255,0.8);
        animation: exploreTwinkle 2.6s infinite ease-in-out;
        z-index: 2;
      }

      .explore-node {
  position: absolute;
  width: 26px;
  height: 26px;
  padding: 0;
  transform: translate(-50%, -50%);
  z-index: 8;
  border: 0;
  background: transparent;
  color: white;
  cursor: pointer;
  touch-action: manipulation;
}

.explore-node.active {
  z-index: 40;
}

.explore-node.featured {
  width: 38px;
  height: 38px;
  z-index: 30;
}

.explore-node-core {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 14px;
  height: 14px;
  transform: translate(-50%, -50%);
  border-radius: 999px;
  background: #cbd5e1;
  box-shadow: 0 0 18px rgba(203,213,225,0.75);
  pointer-events: none;
}

.explore-node-core::before {
  content: '';
  position: absolute;
  inset: -7px;
  border-radius: inherit;
  border: 1px solid rgba(255,255,255,0.22);
  animation: explorePulse 2.2s infinite;
}

.explore-node.visited .explore-node-core {
  background: #ec4899;
  box-shadow: 0 0 20px rgba(236,72,153,1);
}

.explore-node.result-win .explore-node-core {
  background: linear-gradient(135deg, #ec4899, #d6b36a);
  box-shadow:
    0 0 18px rgba(236,72,153,0.95),
    0 0 26px rgba(214,179,106,0.7);
}

.explore-node.result-draw .explore-node-core {
  background: linear-gradient(135deg, #f8fafc, #94a3b8);
  box-shadow: 0 0 20px rgba(226,232,240,0.85);
}

.explore-node.result-lose .explore-node-core {
  background: linear-gradient(135deg, #831843, #451a03);
  box-shadow: 0 0 18px rgba(214,179,106,0.45);
}

.explore-node.featured .explore-node-core {
  width: 30px;
  height: 30px;
  background: #ec4899;
  box-shadow:
    0 0 22px rgba(236,72,153,1),
    0 0 48px rgba(236,72,153,0.65);
}

.explore-node.active .explore-node-core {
  background: #d6b36a;
  box-shadow:
    0 0 24px rgba(214,179,106,1),
    0 0 50px rgba(236,72,153,0.55);
}

.explore-node.has-photo::after {
  content: '';
  position: absolute;
  inset: -6px;
  border-radius: 999px;
  border: 1px solid rgba(250, 204, 21, 0.7);
  box-shadow: 0 0 16px rgba(250, 204, 21, 0.45);
  pointer-events: none;
}

.explore-node-count {
  position: absolute;
  right: -5px;
  top: -5px;
  min-width: 15px;
  height: 15px;
  padding: 0 4px;
  border-radius: 999px;
  background: #facc15;
  color: #2e1065;
  font-size: 9px;
  font-weight: 950;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  box-shadow: 0 0 10px rgba(250,204,21,0.7);
}

.explore-node-label {
  position: absolute;
  left: 24px;
  top: 50%;
  transform: translateY(-50%);
  white-space: nowrap;
  font-size: 11px;
  font-weight: 950;
  color: rgba(255,255,255,0.95);
  text-shadow: 0 0 10px rgba(0,0,0,0.9);
  pointer-events: none;
}

.explore-node.featured .explore-node-label {
  left: 31px;
  font-size: 13px;
}

.explore-node:not(.active):not(.featured) .explore-node-label {
  display: none;
}
      .explore-compass {
        position: absolute;
        right: 16px;
        bottom: 18px;
        width: 54px;
        height: 54px;
        border-radius: 999px;
        border: 1px solid rgba(251,207,232,0.17);
        background: rgba(255,255,255,0.06);
        color: #f9a8d4;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 6;
      }

      .explore-compass span {
        position: absolute;
        top: 7px;
        font-size: 10px;
        color: rgba(255,255,255,0.7);
        font-weight: 900;
      }

      .explore-detail-card {
        display: grid;
        grid-template-columns: 96px 1fr;
        gap: 13px;
        align-items: center;
        border-radius: 24px;
        padding: 12px;
        margin-bottom: 14px;
      }

      .explore-detail-card img {
        width: 96px;
        height: 86px;
        object-fit: cover;
        border-radius: 18px;
      }

      .explore-detail-info span {
        color: #f9a8d4;
        font-size: 10px;
        letter-spacing: 0.18em;
        font-weight: 950;
      }

      .explore-detail-info h2 {
        margin: 5px 0 0;
        font-size: 16px;
        line-height: 1.25;
        font-weight: 950;
      }

      .explore-detail-info p {
        margin: 4px 0 0;
        color: rgba(255,255,255,0.58);
        font-size: 12px;
        font-weight: 800;
      }

      .explore-detail-badges {
        display: flex;
        gap: 7px;
        margin-top: 9px;
      }

      .explore-detail-badges b {
        padding: 5px 8px;
        border-radius: 999px;
        background: rgba(255,255,255,0.08);
        color: rgba(255,255,255,0.58);
        font-size: 10px;
      }

      .explore-detail-badges b.is-visited {
        color: #f5e8ff;
        background: rgba(236,72,153,0.25);
      }

      .explore-detail-badges b.is-favorite {
        color: #fde68a;
        background: rgba(245,158,11,0.18);
      }

      .explore-control-bar {
        border-radius: 24px;
        padding: 10px;
        display: grid;
        grid-template-columns: 46px 1fr 84px;
        gap: 8px;
        align-items: center;
        margin-bottom: 14px;
      }

      .explore-control-between {
        margin-top: -2px;
      }

      .explore-control-bar button {
        border: 1px solid rgba(251,207,232,0.16);
        background: rgba(255,255,255,0.06);
        color: white;
        height: 42px;
        border-radius: 16px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        font-size: 11px;
        font-weight: 900;
      }

      .explore-zoom {
        height: 42px;
        border-radius: 16px;
        border: 1px solid rgba(251,207,232,0.16);
        background: rgba(255,255,255,0.06);
        display: flex;
        align-items: center;
        justify-content: space-around;
        color: rgba(255,255,255,0.72);
      }

      .explore-zoom strong {
        color: #fff;
        font-size: 13px;
      }

      .explore-timeline {
        height: 42px;
        border-radius: 16px;
        border: 1px solid rgba(251,207,232,0.12);
        background: rgba(255,255,255,0.04);
        display: grid;
        grid-template-columns: 1fr 20px 1fr 1fr;
        align-items: center;
        text-align: center;
        font-size: 9px;
        color: rgba(255,255,255,0.45);
        font-weight: 900;
      }

      .explore-timeline i {
        width: 12px;
        height: 12px;
        border-radius: 999px;
        background: #ec4899;
        box-shadow: 0 0 18px #ec4899;
        margin: 0 auto;
      }

      .explore-timeline strong {
        color: #fff;
        font-size: 10px;
      }


      .explore-map-inner {
        position: absolute;
        inset: 0;
        transform-origin: center center;
        transition: transform 0.25s ease;
        z-index: 1;
      }

      .explore-zoom {
        display: grid;
        grid-template-columns: 34px 1fr 34px;
        overflow: hidden;
      }

      .explore-zoom button {
        height: 42px;
        border: 0;
        background: transparent;
        color: white;
        font-size: 19px;
        font-weight: 950;
      }

      .explore-zoom strong {
        color: #fff;
        font-size: 13px;
        text-align: center;
        font-weight: 950;
        cursor: pointer;
      }

      .explore-mode-tabs {
        height: 42px;
        border-radius: 16px;
        border: 1px solid rgba(251,207,232,0.12);
        background: rgba(255,255,255,0.04);
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        align-items: center;
        padding: 4px;
        gap: 4px;
      }

      .explore-mode-tabs button {
        height: 34px;
        border-radius: 12px;
        border: 0;
        background: transparent;
        color: rgba(255,255,255,0.48);
        font-size: 10px;
        font-weight: 950;
      }

      .explore-mode-tabs button.active {
        background: rgba(236,72,153,0.32);
        color: white;
        box-shadow: 0 0 16px rgba(236,72,153,0.26);
      }

      .explore-list-panel {
        position: relative;
        z-index: 2;
        margin-top: -2px;
        margin-bottom: 14px;
        border-radius: 24px;
        padding: 13px;
        border: 1px solid rgba(251,207,232,0.18);
        background: rgba(9, 6, 24, 0.88);
        backdrop-filter: blur(18px);
        box-shadow: 0 18px 42px rgba(0,0,0,0.34);
      }

      .explore-list-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
      }

      .explore-list-header span {
        display: block;
        color: rgba(251,207,232,0.7);
        font-size: 9px;
        letter-spacing: 0.18em;
        font-weight: 950;
      }

      .explore-list-header strong {
        display: block;
        margin-top: 3px;
        color: white;
        font-size: 14px;
        font-weight: 950;
      }

      .explore-list-header button {
        border: 0;
        background: rgba(255,255,255,0.08);
        color: rgba(255,255,255,0.68);
        border-radius: 999px;
        padding: 7px 10px;
        font-size: 10px;
        font-weight: 950;
      }

      .explore-list-items {
        display: grid;
        gap: 8px;
        max-height: 260px;
        overflow-y: auto;
        padding-right: 2px;
      }

      .explore-list-items button {
        width: 100%;
        min-height: 54px;
        border: 1px solid rgba(255,255,255,0.08);
        background: rgba(255,255,255,0.045);
        color: white;
        border-radius: 17px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        padding: 10px 12px;
        text-align: left;
      }

      .explore-list-items button.active {
        border-color: rgba(236,72,153,0.6);
        background: rgba(236,72,153,0.18);
      }

      .explore-list-items strong {
        display: block;
        font-size: 12px;
        font-weight: 950;
        line-height: 1.35;
      }

      .explore-list-items span {
        display: block;
        margin-top: 3px;
        color: rgba(255,255,255,0.48);
        font-size: 10px;
        font-weight: 800;
      }

      .explore-list-items small {
        flex-shrink: 0;
        color: #f9a8d4;
        font-size: 10px;
        font-weight: 950;
      }

      .explore-bottom-nav {
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 100%;
        max-width: 448px;
        height: 76px;
        z-index: 50;
        background: rgba(5, 4, 16, 0.92);
        border-top: 1px solid rgba(251,207,232,0.16);
        backdrop-filter: blur(18px);
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding-bottom: 8px;
      }

      .explore-bottom-nav button {
        background: transparent;
        border: 0;
        color: rgba(255,255,255,0.48);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
        font-size: 10px;
        font-weight: 900;
      }

      .explore-bottom-nav button.active {
        color: #f9a8d4;
        text-shadow: 0 0 14px rgba(249,168,212,0.5);
      }

      .explore-memory-filter-row {
  margin-top: 9px;
}

.explore-memory-card {
  position: relative;
  z-index: 2;
  border-radius: 26px;
  padding: 12px;
  margin-bottom: 14px;
  border: 1px solid rgba(216, 180, 254, 0.18);
  background:
    linear-gradient(180deg, rgba(16, 12, 35, 0.9), rgba(8, 6, 20, 0.78));
  backdrop-filter: blur(18px);
  box-shadow: 0 20px 50px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06);
}

.explore-memory-card.memory-win {
  border-color: rgba(214,179,106,0.4);
  box-shadow:
    0 20px 50px rgba(0,0,0,0.35),
    0 0 28px rgba(214,179,106,0.13);
}

.explore-memory-card.memory-draw {
  border-color: rgba(226,232,240,0.34);
}

.explore-memory-card.memory-lose {
  border-color: rgba(214,179,106,0.28);
}

.memory-photo-wrap {
  position: relative;
  height: 150px;
  border-radius: 22px;
  overflow: hidden;
  background: rgba(255,255,255,0.06);
}

.memory-photo-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(1.12) contrast(1.05);
}

.memory-photo-wrap::after {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, transparent 35%, rgba(0,0,0,0.72) 100%),
    radial-gradient(circle at 20% 20%, rgba(236,72,153,0.22), transparent 35%);
}

.memory-result-badge {
  position: absolute;
  left: 12px;
  bottom: 12px;
  z-index: 2;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(0,0,0,0.55);
  border: 1px solid rgba(255,255,255,0.25);
  color: white;
  font-size: 11px;
  font-weight: 950;
  letter-spacing: 0.16em;
}

.memory-info {
  padding: 14px 3px 2px;
}

.memory-kicker {
  color: #f9a8d4;
  font-size: 10px;
  letter-spacing: 0.18em;
  font-weight: 950;
}

.memory-info h2 {
  margin: 6px 0 0;
  font-size: 18px;
  line-height: 1.25;
  font-weight: 950;
}

.memory-info p {
  margin: 4px 0 0;
  color: rgba(255,255,255,0.56);
  font-size: 12px;
  font-weight: 800;
}

.memory-score {
  margin-top: 12px;
  border-radius: 18px;
  padding: 12px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.08);
}

.memory-score span {
  display: block;
  color: rgba(255,255,255,0.52);
  font-size: 10px;
  font-weight: 900;
}

.memory-score strong {
  display: block;
  margin-top: 5px;
  color: white;
  font-size: 13px;
  line-height: 1.45;
  font-weight: 950;
}

.memory-mini-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 9px;
  margin-top: 10px;
}

.memory-mini-grid div {
  border-radius: 16px;
  padding: 10px;
  background: rgba(255,255,255,0.045);
  border: 1px solid rgba(255,255,255,0.07);
}

.memory-mini-grid span {
  display: block;
  color: rgba(255,255,255,0.42);
  font-size: 9px;
  font-weight: 900;
}

.memory-mini-grid strong {
  display: block;
  margin-top: 4px;
  color: rgba(255,255,255,0.9);
  font-size: 11px;
  line-height: 1.35;
  font-weight: 950;
}

.memory-memo {
  margin-top: 10px;
  border-radius: 18px;
  padding: 12px;
  background: rgba(236,72,153,0.12);
  border: 1px solid rgba(251,207,232,0.12);
  color: rgba(255,255,255,0.82);
  font-size: 12px;
  line-height: 1.7;
  font-weight: 700;
}

.memory-switcher {
  margin-top: 12px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 8px;
  align-items: center;
}

.memory-switcher button {
  height: 36px;
  border-radius: 14px;
  border: 1px solid rgba(251,207,232,0.16);
  background: rgba(255,255,255,0.06);
  color: white;
  font-size: 11px;
  font-weight: 900;
}

.memory-switcher span {
  color: rgba(255,255,255,0.58);
  font-size: 11px;
  font-weight: 900;
}

.memory-empty {
  margin-top: 12px;
  border-radius: 18px;
  padding: 14px;
  background: rgba(255,255,255,0.045);
  border: 1px dashed rgba(251,207,232,0.16);
  color: rgba(255,255,255,0.58);
  font-size: 12px;
  line-height: 1.7;
  font-weight: 800;
}

      @keyframes explorePulse {
        0% {
          transform: scale(0.8);
          opacity: 0.7;
        }
        100% {
          transform: scale(1.8);
          opacity: 0;
        }
      }

      @keyframes exploreTwinkle {
        0%, 100% {
          opacity: 0.18;
          transform: scale(0.8);
        }
        50% {
          opacity: 0.9;
          transform: scale(1.2);
        }
      }

      .explore-map {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  height: auto;
  border-radius: 26px;
  overflow: hidden;
  background:
    radial-gradient(circle at 23% 72%, rgba(236,72,153,0.16), transparent 16%),
    radial-gradient(circle at 68% 44%, rgba(214,179,106,0.13), transparent 18%),
    linear-gradient(180deg, rgba(8,8,26,0.96), rgba(3,4,13,0.96));
}

.explore-map-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  opacity: 0.96;
  filter:
    drop-shadow(0 0 22px rgba(168, 85, 247, 0.36))
    saturate(1.12)
    contrast(1.06);
  z-index: 1;
  pointer-events: none;
  user-select: none;
}
    `}</style>
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
      <section className="relative bg-[#9d174d] text-white overflow-visible">
        <BrandHeader setView={setView} records={records} />

        {/* メインビジュアル */}
        <div className="relative h-[250px] overflow-hidden">
          <img
            src="https://maido-storage.oss-cn-hongkong.aliyuncs.com/maido/uploads/2024/04/cerezo-osaka-game-repot-main.jpg"
            className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105"
            alt="stadium"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-[#831843]/30 via-[#be185d]/68 to-[#9d174d]/95"></div>
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.08)_0%,transparent_35%,transparent_65%,rgba(250,204,21,0.12)_100%)]"></div>

          <div className="absolute left-5 right-5 top-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/15 text-white px-3 py-1.5 rounded-lg text-xs font-black shadow-lg">
                <Medal size={14} className="text-yellow-300" />
                SAKURA PRIDE
              </div>

              <button
                type="button"
                onClick={() => setView('tickets')}
                className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md border border-white/20 text-white px-3 py-1.5 rounded-lg text-xs font-black shadow-lg active:scale-95"
              >
                <Ticket size={14} className="text-yellow-200" />
                桜色のチケットを見る
              </button>

            </div>

            <h1 className="text-[26px] font-black leading-snug tracking-tight drop-shadow-md">
              今日も、桜色の記憶を残そう。
            </h1>

            <div className="mt-4 flex items-end justify-between gap-3">
              <p className="text-sm text-white/95 font-bold leading-7 drop-shadow-sm">
                セレッソのある日常を、<br />
                あなただけのアルバムに。
              </p>

              <button
                type="button"
                onClick={() => setView('explore')}
                className="shrink-0 inline-flex items-center gap-1.5 bg-pink-900/55 backdrop-blur-md border border-pink-200/30 text-white px-2.5 py-2 rounded-2xl text-[11px] font-black shadow-lg active:scale-95"
              >
                <MapPin size={14} className="text-pink-200" />
                スタジアム探検
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 情報カード */}
      <div className="-mt-10 px-3 relative z-30">
        <div className="bg-white rounded-2xl shadow-2xl shadow-pink-950/15 p-4 grid grid-cols-3 divide-x divide-gray-200 border border-white/80">
          <MiniStat icon={<Ticket size={14} />} label="観戦数" value={records.length} unit="試合" />
          <MiniStat icon={<Trophy size={14} />} label="勝利" value={winCount} unit="試合" />
          <div
            onClick={() => setScheduleOpen(true)}
            className="px-3 cursor-pointer active:scale-[0.98] transition"
          >
            <button
              type="button"
              onClick={() => setScheduleOpen(true)}
              className="flex items-center gap-1 text-[#831843] text-xs font-black mb-2 active:scale-95"
            >
              <Calendar size={14} className="shrink-0" />
              次の試合
            </button>
            <p className="text-[9px] text-[#ec4899] font-black mb-1">
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
                      ? 'bg-pink-100 text-[#ec4899]'
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
          <div className="bg-white/95 backdrop-blur-md border border-pink-100 rounded-2xl shadow-xl shadow-pink-900/20 p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-pink-100 text-[#ec4899] flex items-center justify-center shrink-0">
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

              <div className="w-20 h-16 rounded-2xl overflow-hidden bg-pink-50 shrink-0">
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
                className="bg-[#ec4899] text-white text-xs font-black py-3 rounded-2xl active:scale-95"
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
          className="interactive-card w-full bg-gradient-to-r from-[#ec4899] to-[#d6b36a] text-white py-4 rounded-full font-black shadow-xl shadow-pink-900/25 flex items-center justify-center gap-2 active:scale-95 transition"
        >
          <Plus size={18} strokeWidth={3} />
          新たに桜色を彩る
        </button>
      </div>

      <section className="px-5 mt-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-black text-lg">最近の観戦記録</h2>
            <p className="text-xs text-gray-500 font-bold mt-1">
              {showAllRecords ? 'すべての記録を表示中' : '最新3件を表示中'}
            </p>

            <p className="text-[11px] text-[#ec4899] font-black mt-1">
              タップで詳細・編集できます。
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowAllRecords(!showAllRecords)}
            className="interactive-icon text-[#ec4899] text-xs font-black flex items-center"
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
                    <div className="text-[11px] text-[#831843] font-black">
                      {record.date}
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-black px-2 py-1 rounded-full ${result === 'WIN'
                          ? 'bg-pink-100 text-[#ec4899]'
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

                  <span className="inline-block mt-2 bg-pink-100 text-[#ec4899] text-[10px] font-black px-3 py-1 rounded-full">
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
        <div className="bg-gradient-to-r from-[#831843] to-[#d6b36a] text-white p-5">
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
              <div className="sticky top-0 bg-white/95 backdrop-blur-sm py-2 text-[#ec4899] text-sm font-black border-b border-pink-100">
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
                        ? 'bg-pink-50 border-pink-200'
                        : 'bg-[#f8f7fb] border-gray-100'
                        }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-12 h-12 rounded-2xl flex flex-col items-center justify-center shrink-0 ${match.venueType === 'HOME'
                            ? 'bg-[#ec4899] text-white'
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
                              <span className="bg-[#ec4899] text-white text-[9px] font-black px-2 py-0.5 rounded-full">
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
      <div className="flex items-center gap-2 text-[#ec4899] font-black mb-4">
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
                <div className="w-10 h-10 rounded-xl bg-[#ec4899] text-white flex items-center justify-center font-black shrink-0">
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

                <div className="text-xs font-black text-[#ec4899] bg-pink-50 px-2 py-1 rounded-full">
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

  const shareScorers = (data.scorers || []).filter(
    (scorer) => scorer.player || scorer.minute
  );

  const scorerText = shareScorers.length > 0
    ? shareScorers
      .map((scorer) => {
        const name = scorer.player || '得点者未入力';
        const minute = scorer.minute ? `${scorer.minute}分` : '';
        return minute ? `${name} ${minute}` : name;
      })
      .join(' / ')
    : '';

  return (
    <div className="min-h-screen bg-[#f8f7fb] pb-28">
      <BrandHeader back={backTo} setView={setView} />

      <section className="px-5 py-6 space-y-4">
        {/* メインカード */}
        <div className="relative overflow-hidden rounded-[1.8rem] bg-gradient-to-br from-[#831843] via-[#ec4899] to-[#d6b36a] text-white shadow-xl shadow-pink-900/25">
          <img
            src={record.img}
            alt={record.stadium}
            className="absolute inset-0 w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#7c2d12] via-[#92400e]/80 to-[#831843]/70"></div>

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
                    <TeamBadge team={cerezoTeam} size="small" />
                  </div>
                  <div className="text-xs font-black mt-2">
                    C大阪
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-[58px] font-black leading-none tracking-[-0.1em]">
                    {homeScore}
                    <span className="text-white/45 mx-2">-</span>
                    {awayScore}
                  </div>

                  <div className="mt-2 text-[10px] font-black text-[#d6b36a] tracking-[0.32em]">
                    FULL TIME
                  </div>

                  {shareScorers.length > 0 && (
                    <div className="mt-3 mx-auto max-w-[155px] rounded-2xl bg-white/10 border border-white/15 px-3 py-2">
                      <div className="text-[8px] font-black text-white/45 tracking-[0.22em]">
                        SCORERS
                      </div>

                      <div className="mt-1 text-[10px] font-black text-white/90 leading-snug">
                        {scorerText}
                      </div>
                    </div>
                  )}
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
              <div className="text-2xl font-black text-[#ec4899]">
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
                  <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br from-[#ec4899] to-[#831843] text-white flex flex-col items-center justify-center shadow-md">
                    <div className="text-[9px] font-black text-white/70">No.</div>
                    <div className="text-xl font-black leading-none">
                      {selectedMvp.number}
                    </div>
                  </div>
                  <div className="text-[11px] font-black text-[#ec4899] mt-2 truncate">
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
              <div className="text-xl font-black text-[#ec4899] leading-tight">
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
          <div className="flex items-center gap-2 text-[#ec4899] font-black mb-3">
            <PenSquare size={17} />
            思い出メモ
          </div>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {data.memo || 'メモはありません'}
          </p>
        </Card>

        {/* タグ */}
        <Card>
          <div className="flex items-center gap-2 text-[#ec4899] font-black mb-3">
            <TagIcon size={17} />
            タグ
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.length > 0 ? (
              tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-pink-100 text-[#ec4899] text-xs font-black px-3 py-1.5 rounded-full"
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
          <div className="flex items-center gap-2 text-[#ec4899] font-black mb-3">
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
          <div className="flex items-center gap-2 text-[#ec4899] font-black mb-4">
            <Clock size={17} />
            タイムライン
          </div>

          {timeline.length > 0 ? (
            <div className="relative ml-3 border-l-2 border-[#ec4899] space-y-4">
              {timeline.map((item) => (
                <div key={item.id} className="relative pl-6">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-[#ec4899] bg-white"></div>
                  <div className="bg-[#f8f7fb] rounded-2xl p-3 border border-gray-100">
                    <div className="text-xs font-black text-[#ec4899]">
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

        <Card>
          <button
            type="button"
            onClick={() => setView('shareCard')}
            className="w-full flex items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-[#ec4899] to-[#d6b36a] text-white p-4 shadow-lg shadow-pink-900/20 active:scale-[0.99]"
          >
            <div className="flex items-center gap-3 text-left">
              <div className="w-11 h-11 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center">
                <Share2 size={20} />
              </div>

              <div>
                <div className="text-sm font-black">
                  共有カードを作成
                </div>
                <div className="text-xs text-white/80 font-bold mt-1">
                  スクショしてSNSに載せられるカードを表示します
                </div>
              </div>
            </div>

            <ChevronRight size={18} className="shrink-0" />
          </button>
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

function ShareCardView({ record, setView, backTo = 'recordDetail' }) {
  const data = record.draftData || {};
  const cardRef = useRef(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  const scoreMatch = record.score?.match(/(\d+)\s*-\s*(\d+)/);
  const homeScore = data.homeScore ?? (scoreMatch ? scoreMatch[1] : '-');
  const awayScore = data.awayScore ?? (scoreMatch ? scoreMatch[2] : '-');

  const homeNumber = Number(homeScore);
  const awayNumber = Number(awayScore);
  const hasScore = !Number.isNaN(homeNumber) && !Number.isNaN(awayNumber);

  const resultLabel = hasScore
    ? homeNumber > awayNumber
      ? 'WIN'
      : homeNumber < awayNumber
        ? 'LOSE'
        : 'DRAW'
    : 'RECORD';

  const resultSymbol =
    resultLabel === 'WIN'
      ? '○'
      : resultLabel === 'DRAW'
        ? '△'
        : resultLabel === 'LOSE'
          ? '●'
          : '✦';

  const resultTheme = {
    bg: 'from-[#831843]/96 via-[#ec4899]/92 to-[#92400e]/96',
    chip: 'bg-pink-200 text-[#831843] border-pink-100',
    accent: 'text-yellow-300',
    glow: 'bg-pink-300/25',
    shadow: 'shadow-pink-900/25',
  };

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

  const displayStadium =
    record.stadium === 'YANMAR HANASAKA STADIUM'
      ? 'YANMAR'
      : record.stadium === 'エディオンピースウイング広島'
        ? 'Eピース'
        : record.stadium || 'スタジアム未設定';

  const displayMvp = selectedMvp
    ? `No.${selectedMvp.number} ${selectedMvp.name}`
    : data.mvp || '未選択';



  const shareScorers = (data.scorers || []).filter(
    (scorer) => scorer.player || scorer.minute
  );

  const scorerText = shareScorers.length > 0
    ? shareScorers
      .map((scorer) => {
        const name = scorer.player || '得点者未入力';
        const minute = scorer.minute ? `${scorer.minute}分` : '';
        return minute ? `${name} ${minute}` : name;
      })
      .join(' / ')
    : '';

  const handleSaveImage = async () => {
    if (isSaving) return;

    setIsSaving(true);
    setSaveError('');

    try {
      if (document.fonts?.ready) {
        await document.fonts.ready;
      }

      const canvas = document.createElement('canvas');
      const width = 1080;
      const height = 1500;
      const scale = 2;

      canvas.width = width * scale;
      canvas.height = height * scale;

      const ctx = canvas.getContext('2d');
      ctx.scale(scale, scale);

      const roundRect = (x, y, w, h, r) => {
        const radius = Math.min(r, w / 2, h / 2);

        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + w - radius, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
        ctx.lineTo(x + w, y + h - radius);
        ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
        ctx.lineTo(x + radius, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
      };

      const fillRoundRect = (x, y, w, h, r, fillStyle) => {
        roundRect(x, y, w, h, r);
        ctx.fillStyle = fillStyle;
        ctx.fill();
      };

      const strokeRoundRect = (x, y, w, h, r, strokeStyle, lineWidth = 2) => {
        roundRect(x, y, w, h, r);
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
      };

      const drawText = ({
        text,
        x,
        y,
        font,
        color = '#ffffff',
        align = 'left',
        baseline = 'alphabetic',
        maxWidth,
      }) => {
        ctx.font = font;
        ctx.fillStyle = color;
        ctx.textAlign = align;
        ctx.textBaseline = baseline;

        if (maxWidth) {
          ctx.fillText(String(text), x, y, maxWidth);
        } else {
          ctx.fillText(String(text), x, y);
        }
      };

      const drawWrappedText = ({
        text,
        x,
        y,
        maxWidth,
        lineHeight,
        maxLines,
        font,
        color = '#ffffff',
        align = 'left',
      }) => {
        const source = String(text || '');
        const chars = Array.from(source);
        const lines = [];

        ctx.font = font;

        let line = '';

        for (const char of chars) {
          const testLine = line + char;

          if (ctx.measureText(testLine).width > maxWidth && line) {
            lines.push(line);
            line = char;

            if (lines.length === maxLines) break;
          } else {
            line = testLine;
          }
        }

        if (line && lines.length < maxLines) {
          lines.push(line);
        }

        const isTruncated = lines.join('').length < source.length;

        if (isTruncated && lines.length > 0) {
          let lastLine = lines[lines.length - 1];

          while (ctx.measureText(`${lastLine}...`).width > maxWidth && lastLine.length > 0) {
            lastLine = lastLine.slice(0, -1);
          }

          lines[lines.length - 1] = `${lastLine}...`;
        }

        lines.forEach((lineText, index) => {
          drawText({
            text: lineText,
            x,
            y: y + index * lineHeight,
            font,
            color,
            align,
          });
        });
      };

      const drawTeamBadge = ({ x, y, main, sub }) => {
        const size = 138;
        const cx = x + size / 2;

        ctx.save();

        // 背景の角丸エンブレム
        roundRect(x, y, size, size, 34);
        ctx.clip();

        ctx.fillStyle = main || '#ec4899';
        ctx.fillRect(x, y, size, size);

        // 右下の差し色
        ctx.fillStyle = sub || '#f1f1f1';
        ctx.beginPath();
        ctx.moveTo(x + size, y + size * 0.42);
        ctx.lineTo(x + size, y + size);
        ctx.lineTo(x + size * 0.42, y + size);
        ctx.closePath();
        ctx.fill();

        // うっすら斜めライン
        ctx.globalAlpha = 0.14;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(x + size * 0.08, y);
        ctx.lineTo(x + size * 0.28, y);
        ctx.lineTo(x + size * 0.92, y + size);
        ctx.lineTo(x + size * 0.72, y + size);
        ctx.closePath();
        ctx.fill();
        ctx.globalAlpha = 1;

        ctx.restore();

        // 外枠
        strokeRoundRect(x, y, size, size, 34, 'rgba(255,255,255,0.30)', 3);

        // 文字なしの白い盾マーク
        ctx.save();

        ctx.fillStyle = 'rgba(255,255,255,0.94)';
        ctx.beginPath();
        ctx.moveTo(cx, y + 28);
        ctx.bezierCurveTo(x + size * 0.70, y + 34, x + size * 0.90, y + 48, x + size * 0.88, y + 72);
        ctx.bezierCurveTo(x + size * 0.85, y + 101, x + size * 0.66, y + 119, cx, y + 128);
        ctx.bezierCurveTo(x + size * 0.34, y + 119, x + size * 0.15, y + 101, x + size * 0.12, y + 72);
        ctx.bezierCurveTo(x + size * 0.10, y + 48, x + size * 0.30, y + 34, cx, y + 28);
        ctx.closePath();
        ctx.fill();

        // 盾の内側に薄いライン
        ctx.strokeStyle = 'rgba(75,28,137,0.22)';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(cx, y + 45);
        ctx.lineTo(cx, y + 105);
        ctx.stroke();

        ctx.restore();
      };

      const safeHomeScore = homeScore || '-';
      const safeAwayScore = awayScore || '-';
      const safeOpponent = record.opponent || data.opponent || '対戦相手未入力';
      const safeDate = record.date || data.date || '日付未入力';


      // 背景
      const bg = ctx.createLinearGradient(0, 0, width, height);
      bg.addColorStop(0, '#831843');
      bg.addColorStop(0.45, '#ec4899');
      bg.addColorStop(1, '#92400e');

      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      // 光の装飾
      ctx.globalAlpha = 0.22;
      ctx.fillStyle = '#d6b36a';
      ctx.beginPath();
      ctx.arc(930, 140, 210, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalAlpha = 0.18;
      ctx.fillStyle = '#ec4899';
      ctx.beginPath();
      ctx.arc(120, 1280, 260, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalAlpha = 1;

      // 外枠
      strokeRoundRect(34, 34, width - 68, height - 68, 56, 'rgba(214,179,106,0.42)', 4);
      strokeRoundRect(54, 54, width - 108, height - 108, 44, 'rgba(255,255,255,0.12)', 2);

      // 上部
      drawText({
        text: 'MATCH MEMORY',
        x: 86,
        y: 120,
        font: '900 34px system-ui, -apple-system, BlinkMacSystemFont, "Noto Sans JP", sans-serif',
        color: '#facc15',
      });

      drawText({
        text: safeDate,
        x: 86,
        y: 168,
        font: '800 32px system-ui, -apple-system, BlinkMacSystemFont, "Noto Sans JP", sans-serif',
        color: 'rgba(255,255,255,0.86)',
      });

      fillRoundRect(width - 300, 82, 214, 64, 32, '#e9d5ff');
      strokeRoundRect(width - 300, 82, 214, 64, 32, 'rgba(255,255,255,0.5)', 2);

      drawText({
        text: `${resultLabel} ${resultSymbol}`,
        x: width - 193,
        y: 116,
        font: '900 30px system-ui, -apple-system, BlinkMacSystemFont, "Noto Sans JP", sans-serif',
        color: '#831843',
        align: 'center',
        baseline: 'middle',
      });

      // スコアカード
      fillRoundRect(72, 235, 936, 420, 48, 'rgba(255,255,255,0.12)');
      strokeRoundRect(72, 235, 936, 420, 48, 'rgba(255,255,255,0.20)', 3);

      drawText({
        text: 'CEREZO OSAKA',
        x: width / 2,
        y: 302,
        font: '900 28px system-ui, -apple-system, BlinkMacSystemFont, "Noto Sans JP", sans-serif',
        color: 'rgba(255,255,255,0.72)',
        align: 'center',
      });

      drawTeamBadge({
        x: 150,
        y: 365,
        main: cerezoTeam.main,
        sub: cerezoTeam.sub,
      });

      drawTeamBadge({
        x: 792,
        y: 365,
        main: opponentTeam.main,
        sub: opponentTeam.sub,
      });

      drawText({
        text: `${safeHomeScore} - ${safeAwayScore}`,
        x: width / 2,
        y: 448,
        font: '900 104px system-ui, -apple-system, BlinkMacSystemFont, "Noto Sans JP", sans-serif',
        color: '#ffffff',
        align: 'center',
        baseline: 'middle',
      });

      drawText({
        text: 'SCORE',
        x: width / 2,
        y: 525,
        font: '900 24px system-ui, -apple-system, BlinkMacSystemFont, "Noto Sans JP", sans-serif',
        color: '#facc15',
        align: 'center',
      });

      drawWrappedText({
        text: `セレッソ大阪 vs ${safeOpponent}`,
        x: width / 2,
        y: 592,
        maxWidth: 820,
        lineHeight: 38,
        maxLines: 2,
        font: '900 34px system-ui, -apple-system, BlinkMacSystemFont, "Noto Sans JP", sans-serif',
        color: '#ffffff',
        align: 'center',
      });

      // 情報カード
      fillRoundRect(72, 720, 936, 132, 34, 'rgba(255,255,255,0.12)');
      strokeRoundRect(72, 720, 936, 132, 34, 'rgba(255,255,255,0.18)', 2);

      drawText({
        text: 'STADIUM',
        x: 116,
        y: 768,
        font: '900 24px system-ui, -apple-system, BlinkMacSystemFont, "Noto Sans JP", sans-serif',
        color: 'rgba(255,255,255,0.62)',
      });

      drawWrappedText({
        text: displayStadium,
        x: 116,
        y: 816,
        maxWidth: 850,
        lineHeight: 38,
        maxLines: 1,
        font: '900 36px system-ui, -apple-system, BlinkMacSystemFont, "Noto Sans JP", sans-serif',
        color: '#ffffff',
      });

      fillRoundRect(72, 890, 936, 132, 34, 'rgba(255,255,255,0.12)');
      strokeRoundRect(72, 890, 936, 132, 34, 'rgba(255,255,255,0.18)', 2);

      drawText({
        text: 'MY MVP',
        x: 116,
        y: 938,
        font: '900 24px system-ui, -apple-system, BlinkMacSystemFont, "Noto Sans JP", sans-serif',
        color: 'rgba(255,255,255,0.62)',
      });

      drawWrappedText({
        text: displayMvp,
        x: 116,
        y: 986,
        maxWidth: 850,
        lineHeight: 38,
        maxLines: 1,
        font: '900 36px system-ui, -apple-system, BlinkMacSystemFont, "Noto Sans JP", sans-serif',
        color: '#ffffff',
      });

      if (data.memo) {
        fillRoundRect(72, 1060, 936, 190, 34, 'rgba(255,255,255,0.12)');
        strokeRoundRect(72, 1060, 936, 190, 34, 'rgba(255,255,255,0.18)', 2);

        drawText({
          text: 'MEMO',
          x: 116,
          y: 1108,
          font: '900 24px system-ui, -apple-system, BlinkMacSystemFont, "Noto Sans JP", sans-serif',
          color: 'rgba(255,255,255,0.62)',
        });

        drawWrappedText({
          text: String(data.memo).slice(0, 90),
          x: 116,
          y: 1156,
          maxWidth: 850,
          lineHeight: 40,
          maxLines: 2,
          font: '800 30px system-ui, -apple-system, BlinkMacSystemFont, "Noto Sans JP", sans-serif',
          color: '#ffffff',
        });
      }

      // 下部
      drawText({
        text: 'CEREZO LOG',
        x: 86,
        y: 1408,
        font: '900 24px system-ui, -apple-system, BlinkMacSystemFont, "Noto Sans JP", sans-serif',
        color: 'rgba(255,255,255,0.70)',
      });

      drawText({
        text: `${resultLabel} ${resultSymbol}`,
        x: width - 86,
        y: 1408,
        font: '900 24px system-ui, -apple-system, BlinkMacSystemFont, "Noto Sans JP", sans-serif',
        color: 'rgba(255,255,255,0.70)',
        align: 'right',
      });

      const blob = await new Promise((resolve) => {
        canvas.toBlob(resolve, 'image/png');
      });

      if (!blob) {
        throw new Error('Canvas image creation failed');
      }

      const fileDate = String(record.date || 'match').replace(/[./]/g, '-');
      const fileOpponent = String(record.opponent || 'opponent').replace(/[\\/:*?"<>|]/g, '');

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');

      link.href = url;
      link.download = `cerezo-log-${fileDate}-${fileOpponent}.png`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 1000);
    } catch (error) {
      console.error(error);
      setSaveError('画像保存に失敗しました。スクリーンショットで保存してください。');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f7fb] pb-28">
      <BrandHeader back={backTo} setView={setView} />

      <section className="px-5 py-6 space-y-4">
        <div>
          <div className="flex items-center gap-2 text-[#ec4899] font-black text-sm mb-1">
            <Share2 size={18} />
            SHARE CARD
          </div>

          <h1 className="text-2xl font-black text-[#171425]">
            共有カード
          </h1>

          <p className="text-xs text-gray-500 font-bold mt-1 leading-6">
            画像を保存できます。
          </p>
        </div>

        <div className="bg-white rounded-[2rem] border border-gray-200 shadow-sm p-3">
          <div
            ref={cardRef}
            className="relative overflow-hidden rounded-[2rem] min-h-[560px] text-white shadow-2xl shadow-pink-900/25 bg-[#831843]"
          >
            {/* 背景 */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#831843] via-[#ec4899] to-[#d6b36a]"></div>

            {/* 光 */}
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[#d6b36a]/20 blur-3xl"></div>
            <div className="absolute -bottom-28 -left-24 w-72 h-72 rounded-full bg-pink-300/20 blur-3xl"></div>

            {/* 斜め装飾 */}
            <div className="absolute -right-16 top-0 h-full w-28 rotate-[14deg] bg-white/8"></div>
            <div className="absolute -right-2 top-0 h-full w-2 rotate-[14deg] bg-[#d6b36a]/70"></div>
            <div className="absolute left-0 top-0 h-full w-2 bg-[#d6b36a]"></div>

            {/* うっすら大文字 */}
            <div className="absolute -bottom-5 right-3 text-[74px] font-black tracking-[-0.08em] text-white/5 leading-none">
              CEREZO
            </div>

            <div className="relative z-10 min-h-[560px] p-5 flex flex-col">
              {/* 上部 */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-[10px] font-black tracking-[0.32em] text-[#d6b36a]">
                    MATCHDAY MEMORY
                  </div>

                  <div className="mt-2 text-[22px] font-black tracking-[-0.06em]">
                    CEREZO LOG
                  </div>

                  <div className="mt-1 h-[2px] w-20 bg-[#d6b36a] rounded-full"></div>
                </div>

                <div className="rounded-full bg-[#d6b36a] text-[#831843] px-3 py-1 text-[11px] font-black border border-white/30 shadow-lg">
                  {resultLabel} {resultSymbol}
                </div>
              </div>

              {/* 日付 */}
              <div className="mt-7">
                <div className="text-[11px] font-black text-white/55 tracking-[0.22em]">
                  DATE
                </div>
                <div className="text-2xl font-black mt-1">
                  {record.date}
                </div>
              </div>

              {/* メインスコア */}
              <div className="mt-8 rounded-[1.8rem] bg-white/10 border border-white/15 p-5 shadow-lg shadow-black/10">
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                  <div className="text-center min-w-0">
                    <div className="w-14 h-14 mx-auto flex items-center justify-center">
                      <TeamBadge team={cerezoTeam} />
                    </div>
                    <div className="text-[12px] font-black mt-2 truncate">
                      C大阪
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-[58px] font-black leading-none tracking-[-0.1em]">
                      {homeScore}
                      <span className="text-white/45 mx-2">-</span>
                      {awayScore}
                    </div>

                    <div className="mt-2 text-[10px] font-black text-[#d6b36a] tracking-[0.32em]">
                      FULL TIME
                    </div>
                  </div>

                  <div className="text-center min-w-0">
                    <div className="w-14 h-14 mx-auto flex items-center justify-center">
                      <TeamBadge team={opponentTeam} />
                    </div>
                    <div className="text-[12px] font-black mt-2 truncate">
                      {opponentTeam.short || record.opponent}
                    </div>
                  </div>
                </div>

                <div className="mt-5 text-center">
                  <div className="text-[11px] font-black text-white/55 tracking-[0.2em]">
                    MATCH
                  </div>
                  <div className="text-sm font-black mt-1 leading-relaxed">
                    セレッソ大阪 vs {record.opponent}
                  </div>
                </div>
              </div>

              {/* 詳細情報 */}
              <div className="mt-5 grid gap-3">
                <div className="rounded-2xl bg-white/10 border border-white/15 px-4 py-3">
                  <div className="text-[10px] font-black text-[#d6b36a] tracking-[0.22em] mb-1">
                    STADIUM
                  </div>
                  <div className="text-[15px] font-black leading-snug">
                    {displayStadium}
                  </div>
                </div>

                <div className="rounded-2xl bg-white/10 border border-white/15 px-4 py-3">
                  <div className="text-[10px] font-black text-[#d6b36a] tracking-[0.22em] mb-1">
                    MY MVP
                  </div>
                  <div className="text-[15px] font-black leading-snug">
                    {displayMvp}
                  </div>
                </div>

                {data.memo ? (
                  <div className="rounded-2xl bg-white/10 border border-white/15 px-4 py-3">
                    <div className="text-[10px] font-black text-[#d6b36a] tracking-[0.22em] mb-1">
                      MEMORY
                    </div>
                    <div className="text-sm font-bold leading-6 text-white/90">
                      {String(data.memo).slice(0, 58)}
                      {String(data.memo).length > 58 ? '...' : ''}
                    </div>
                  </div>
                ) : null}
              </div>

              {/* 下部 */}
              <div className="mt-auto pt-5 flex items-end justify-between">
                <div>
                  <div className="text-[10px] font-black text-white/45 tracking-[0.25em]">
                    CAPTURE EVERY MATCH MEMORY
                  </div>
                  <div className="text-[13px] font-black text-[#d6b36a] mt-1">
                    CEREZO OSAKA
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[22px] font-black text-white">
                    {resultSymbol}
                  </div>
                  <div className="text-[10px] font-black text-white/50 tracking-[0.2em]">
                    {resultLabel}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {saveError && (
          <div className="bg-red-50 border border-red-100 rounded-2xl p-4 text-xs text-red-600 font-bold leading-6">
            {saveError}
          </div>
        )}

        <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-4">
          <div className="text-sm font-black text-yellow-700">
            使い方
          </div>
          <div className="text-xs text-yellow-700 font-bold leading-6 mt-1">
            「画像保存」を押すと、この共有カードだけをPNG画像として保存できます。保存できない場合はスクリーンショットでもOKです。
          </div>
        </div>
      </section>

      <BottomAction>
        <button
          onClick={() => setView(backTo)}
          className="secondary-btn"
        >
          <ChevronLeft size={20} />
          戻る
        </button>

        <button
          onClick={handleSaveImage}
          disabled={isSaving}
          className="primary-btn flex-[1.4] disabled:opacity-60 disabled:active:scale-100"
        >
          <Download size={18} />
          {isSaving ? '保存中...' : '画像保存'}
        </button>
      </BottomAction>
    </div>
  );
}

function FavoriteRecordsView({ setView, records, onEdit, onToggleFavorite, onOpenDetail }) {
  const favoriteRecords = records.filter((record) => record.favorite);

  return (
    <div className="min-h-screen bg-[#f8f7fb] pb-24">
      <BrandHeader back="home" setView={setView} />

      <section className="px-5 py-6">
        <div className="mb-5">
          <div className="flex items-center gap-2 text-[#ec4899] font-black text-sm mb-1">
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
                    <div className="text-[11px] text-[#831843] font-black">
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
            <div className="w-16 h-16 mx-auto rounded-2xl bg-pink-50 text-[#ec4899] flex items-center justify-center mb-4">
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
              className="mt-5 bg-[#ec4899] text-white text-sm font-black px-5 py-3 rounded-full shadow-lg shadow-pink-900/20"
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
  const [seasonFilter, setSeasonFilter] = useState('ALL');
  const [favoriteOnly, setFavoriteOnly] = useState(false);
  const [selectMode, setSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  const homeStadium = 'YANMAR HANASAKA STADIUM';

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

    const matchSeason =
      seasonFilter === 'ALL' || getRecordSeason(record) === seasonFilter;

    return matchKeyword && matchVenue && matchResult && matchSeason && matchFavorite;
  });

  const resetFilters = () => {
    setKeyword('');
    setVenueFilter('ALL');
    setResultFilter('ALL');
    setSeasonFilter('ALL');
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
            className="text-xs font-black text-[#ec4899] bg-pink-50 border border-pink-100 px-3 py-2 rounded-full"
          >
            ホームへ
          </button>
        </div>

        {/* 検索・絞り込み */}
        <div className="bg-white rounded-[1.6rem] p-4 border border-gray-100 shadow-sm mb-5">
          <div className="flex items-center gap-2 text-[#ec4899] font-black mb-3">
            <List size={18} />
            記録を探す
          </div>

          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="対戦相手・スタジアム・タグで検索"
            className="w-full h-12 rounded-2xl bg-[#f8f7fb] border border-gray-200 px-4 text-sm font-bold outline-none focus:border-[#ec4899]"
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
                    ? 'bg-[#ec4899] text-white border-[#ec4899]'
                    : 'bg-white text-gray-500 border-gray-200'
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <div className="text-[11px] text-gray-500 font-black mb-1.5">
              シーズン
            </div>

            <div className="relative">
              <select
                value={seasonFilter}
                onChange={(e) => setSeasonFilter(e.target.value)}
                className="w-full h-9 appearance-none rounded-xl bg-[#f8f7fb] border border-gray-200 px-3 pr-9 text-xs font-black text-[#171425] outline-none focus:border-[#ec4899]"
              >
                <option value="ALL">全シーズン</option>
                <option value="2026-27">2026/27シーズン</option>
                <option value="100year">百年構想リーグ</option>
              </select>

              <ChevronRight
                size={15}
                className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-[#ec4899] pointer-events-none"
              />
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
                    ? 'bg-[#ec4899] text-white border-[#ec4899]'
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
                ? 'bg-yellow-300 text-[#831843] border-yellow-300'
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

              <p className="text-[11px] text-[#ec4899] font-black mt-1">
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
                className="text-[11px] font-black text-[#ec4899] bg-pink-50 border border-pink-100 px-3 py-2 rounded-full"
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
                      <div className="text-[11px] text-[#831843] font-black">
                        {record.date}
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-black px-2 py-1 rounded-full ${result === 'WIN'
                            ? 'bg-pink-100 text-[#ec4899]'
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
                      <span className="bg-pink-100 text-[#ec4899] text-[10px] font-black px-3 py-1 rounded-full">
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
            <div className="w-16 h-16 mx-auto rounded-2xl bg-pink-50 text-[#ec4899] flex items-center justify-center mb-4">
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
              className="mt-5 bg-[#ec4899] text-white text-sm font-black px-5 py-3 rounded-full shadow-lg shadow-pink-900/20"
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
  const homeStadium = 'YANMAR HANASAKA STADIUM';

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

  const [showSeasonStats, setShowSeasonStats] = useState(false);

  const [selectedSeasonFilter, setSelectedSeasonFilter] = useState('all');
  const [seasonSelectOpen, setSeasonSelectOpen] = useState(false);

  const filteredRecords =
    selectedSeasonFilter === 'all'
      ? records
      : records.filter((record) => getRecordSeason(record) === selectedSeasonFilter);

  const selectedSeasonLabel =
    selectedSeasonFilter === 'all'
      ? '全シーズン'
      : getSeasonInfo(selectedSeasonFilter).label;

  const results = filteredRecords.map((record) => {
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

  const totalGames = filteredRecords.length;
  const wins = results.filter((record) => record.result === 'win').length;
  const draws = results.filter((record) => record.result === 'draw').length;
  const losses = results.filter((record) => record.result === 'lose').length;
  const winRate = totalGames > 0 ? ((wins / totalGames) * 100).toFixed(1) : '0.0';

  const homeRecords = results.filter((record) => record.venueType === 'HOME');
  const awayRecords = results.filter((record) => record.venueType === 'AWAY');

  const totalGoals = results.reduce(
    (sum, record) => sum + Number(record.homeScore || 0),
    0
  );

  const totalConceded = results.reduce(
    (sum, record) => sum + Number(record.awayScore || 0),
    0
  );

  const goalDifference = totalGoals - totalConceded;

  const cleanSheets = results.filter(
    (record) => Number(record.awayScore) === 0
  ).length;

  const cleanSheetRate =
    totalGames > 0 ? ((cleanSheets / totalGames) * 100).toFixed(1) : '0.0';

  const createVenueSummary = (targetRecords) => {
    const games = targetRecords.length;
    const venueWins = targetRecords.filter((record) => record.result === 'win').length;
    const venueDraws = targetRecords.filter((record) => record.result === 'draw').length;
    const venueLosses = targetRecords.filter((record) => record.result === 'lose').length;

    const goals = targetRecords.reduce(
      (sum, record) => sum + Number(record.homeScore || 0),
      0
    );

    const conceded = targetRecords.reduce(
      (sum, record) => sum + Number(record.awayScore || 0),
      0
    );

    return {
      games,
      wins: venueWins,
      draws: venueDraws,
      losses: venueLosses,
      goals,
      conceded,
      winRate: games > 0 ? ((venueWins / games) * 100).toFixed(1) : '0.0',
    };
  };

  const homeSummary = createVenueSummary(homeRecords);
  const awaySummary = createVenueSummary(awayRecords);

  const resultGraphData = [
    {
      label: '勝ち',
      value: wins,
      rightText: `${wins}勝`,
      barClass: 'bg-[#ec4899]',
    },
    {
      label: '引き分け',
      value: draws,
      rightText: `${draws}分`,
      barClass: 'bg-gray-400',
    },
    {
      label: '負け',
      value: losses,
      rightText: `${losses}敗`,
      barClass: 'bg-red-400',
    },
  ];

  const scoreGraphData = [
    {
      label: '得点',
      value: totalGoals,
      rightText: `${totalGoals}点`,
      barClass: 'bg-[#ec4899]',
    },
    {
      label: '失点',
      value: totalConceded,
      rightText: `${totalConceded}点`,
      barClass: 'bg-red-400',
    },
  ];

  const totalExpense = filteredRecords.reduce((sum, record) => {
    return sum + sumExpenses(record.draftData?.expenses);
  }, 0);

  const averageExpense = totalGames > 0 ? Math.round(totalExpense / totalGames) : 0;

  const stadiumRanking = toRanking(countBy(filteredRecords.map((record) => record.stadium)));
  const opponentRanking = toRanking(countBy(filteredRecords.map((record) => record.opponent)));
  const mvpRanking = toRanking(countBy(filteredRecords.map((record) => record.draftData?.mvp)));

  const expenseBreakdown = {
    ticket: filteredRecords.reduce((sum, record) => sum + Number(record.draftData?.expenses?.ticket || 0), 0),
    goods: filteredRecords.reduce((sum, record) => sum + Number(record.draftData?.expenses?.goods || 0), 0),
    food: filteredRecords.reduce((sum, record) => sum + Number(record.draftData?.expenses?.food || 0), 0),
    transport: filteredRecords.reduce((sum, record) => sum + Number(record.draftData?.expenses?.transport || 0), 0),
    other: filteredRecords.reduce((sum, record) => sum + Number(record.draftData?.expenses?.other || 0), 0),
  };

  return (
    <div className="min-h-screen bg-[#f8f7fb] pb-24">
      <BrandHeader setView={setView} />
      <div className="px-5 pt-5">
        <div className="bg-white rounded-2xl border border-pink-100 shadow-sm p-3">
          <div className="flex items-center justify-between gap-3 mb-2">
            <div>
              <div className="text-[10px] font-black text-[#ec4899]">
                SEASON
              </div>
              <div className="text-xs font-black text-[#171425]">
                表示するシーズン
              </div>
            </div>

            <div className="text-[10px] font-black text-white bg-[#ec4899] rounded-full px-2.5 py-1">
              {filteredRecords.length}試合
            </div>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setSeasonSelectOpen(!seasonSelectOpen)}
              className="w-full h-9 rounded-xl bg-[#f8f7fb] border border-gray-200 px-3 text-xs font-black text-[#171425] flex items-center justify-between active:scale-[0.98]"
            >
              <span>{selectedSeasonLabel}</span>

              <ChevronRight
                size={15}
                className={`text-[#ec4899] transition ${seasonSelectOpen ? 'rotate-90' : ''
                  }`}
              />
            </button>

            {seasonSelectOpen && (
              <div className="absolute left-0 right-0 top-11 z-[999] bg-white border border-pink-100 rounded-2xl shadow-xl overflow-hidden">
                {[
                  { key: 'all', label: '全シーズン' },
                  ...seasonOptions,
                ].map((season) => (
                  <button
                    key={season.key}
                    type="button"
                    onClick={() => {
                      setSelectedSeasonFilter(season.key);
                      setSeasonSelectOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-xs font-black border-b border-gray-100 last:border-b-0 ${selectedSeasonFilter === season.key
                      ? 'bg-pink-50 text-[#ec4899]'
                      : 'bg-white text-[#171425]'
                      }`}
                  >
                    {season.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <section className="px-5 py-6">
        <div className="mb-5">
          <div className="flex items-center gap-2 text-[#ec4899] font-black text-sm mb-1">
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

        <button
          type="button"
          onClick={() => setShowSeasonStats(!showSeasonStats)}
          className="w-full mb-4 bg-white border border-pink-100 rounded-2xl p-4 shadow-sm flex items-center justify-between active:scale-[0.98]"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-pink-50 text-[#ec4899] flex items-center justify-center">
              <BarChart2 size={20} />
            </div>

            <div className="text-left">
              <div className="text-sm font-black text-[#171425]">
                シーズン成績を見る
              </div>
              <div className="text-[11px] text-gray-500 font-bold mt-1">
                勝率・得点・失点・HOME/AWAYをグラフ化
              </div>
            </div>
          </div>

          <ChevronRight
            size={20}
            className={`text-[#ec4899] transition ${showSeasonStats ? 'rotate-90' : ''
              }`}
          />
        </button>


        {showSeasonStats && (
          <>
            {/* シーズン成績 */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 text-[#ec4899] font-black">
                    <BarChart2 size={18} />
                    シーズン成績
                  </div>
                  <p className="text-xs text-gray-500 font-bold mt-1">
                    観戦記録から自動で集計
                  </p>
                </div>

                <div className="bg-pink-50 text-[#ec4899] border border-pink-100 rounded-full px-3 py-1 text-xs font-black">
                  AUTO
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <SeasonStatMiniCard
                  label="観戦数"
                  value={totalGames}
                  unit="試合"
                  sub="記録した試合"
                />

                <SeasonStatMiniCard
                  label="勝率"
                  value={winRate}
                  unit="%"
                  sub={`${wins}勝 ${draws}分 ${losses}敗`}
                />

                <SeasonStatMiniCard
                  label="得点"
                  value={totalGoals}
                  unit="点"
                  sub={`1試合平均 ${totalGames > 0 ? (totalGoals / totalGames).toFixed(1) : '0.0'}点`}
                />

                <SeasonStatMiniCard
                  label="失点"
                  value={totalConceded}
                  unit="点"
                  sub={`得失点差 ${goalDifference >= 0 ? '+' : ''}${goalDifference}`}
                />

                <SeasonStatMiniCard
                  label="クリーンシート"
                  value={cleanSheets}
                  unit="試合"
                  sub={`${cleanSheetRate}%`}
                />

                <SeasonStatMiniCard
                  label="HOME / AWAY"
                  value={`${homeRecords.length}/${awayRecords.length}`}
                  unit=""
                  sub="ホーム / アウェイ"
                />
              </div>
            </Card>

            <div className="h-4"></div>

            <SeasonBarGraph
              title="勝・分・負グラフ"
              icon={<Trophy size={18} />}
              data={resultGraphData}
              emptyText="まだ勝敗データがありません"
            />

            <div className="h-4"></div>

            <SeasonBarGraph
              title="得点 / 失点グラフ"
              icon={<Flag size={18} />}
              data={scoreGraphData}
              emptyText="まだ得点データがありません"
            />

            <div className="h-4"></div>

            <VenueCompareGraph
              homeSummary={homeSummary}
              awaySummary={awaySummary}
            />

            <div className="h-4"></div>

            <CleanSheetGraph
              cleanSheets={cleanSheets}
              totalGames={totalGames}
              cleanSheetRate={cleanSheetRate}
            />

            <div className="h-4"></div>
          </>
        )}
        {/* メイン統計 */}
        <div className="relative overflow-hidden rounded-[1.8rem] bg-gradient-to-br from-[#831843] via-[#ec4899] to-[#d6b36a] text-white p-5 shadow-xl shadow-pink-900/25 mb-4">
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
          <div className="flex items-center gap-2 text-[#ec4899] font-black mb-4">
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
          <div className="flex items-center gap-2 text-[#ec4899] font-black mb-4">
            <Wallet size={18} />
            観戦費用
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-pink-50 rounded-2xl p-4">
              <div className="text-xs text-gray-500 font-black">合計費用</div>
              <div className="text-2xl font-black text-[#ec4899] mt-1">
                ¥{totalExpense.toLocaleString()}
              </div>
            </div>

            <div className="bg-pink-50 rounded-2xl p-4">
              <div className="text-xs text-gray-500 font-black">平均費用</div>
              <div className="text-2xl font-black text-[#ec4899] mt-1">
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
          emptyText="スタジアム記録がありません"
        />

        <div className="h-4"></div>

        <RankingBlock
          icon={<Users size={18} />}
          title="対戦相手ランキング"
          items={opponentRanking}
          emptyText="対戦相手の記録がありません"
        />

        <div className="h-4"></div>

        <RankingBlock
          icon={<Star size={18} />}
          title="MVPランキング"
          items={mvpRanking}
          emptyText="MVPが登録された記録がありません"
        />
      </section>
    </div>
  );
}

function SeasonStatMiniCard({ label, value, unit, sub }) {
  return (
    <div className="bg-[#f8f7fb] rounded-2xl p-4 border border-gray-100">
      <div className="text-xs text-gray-500 font-black">
        {label}
      </div>

      <div className="text-2xl font-black text-[#ec4899] mt-1 leading-none">
        {value}
        {unit && (
          <span className="text-sm text-gray-500 ml-1">
            {unit}
          </span>
        )}
      </div>

      <div className="text-[11px] text-gray-400 font-bold mt-2">
        {sub}
      </div>
    </div>
  );
}

function SeasonBarGraph({ title, icon, data, emptyText }) {
  const maxValue = Math.max(...data.map((item) => item.value), 1);
  const totalValue = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-[#ec4899] font-black">
          {icon}
          {title}
        </div>

        <div className="text-xs text-gray-500 font-black">
          合計 {totalValue}
        </div>
      </div>

      {totalValue > 0 ? (
        <div className="space-y-4">
          {data.map((item) => (
            <GraphBar
              key={item.label}
              label={item.label}
              value={item.value}
              maxValue={maxValue}
              rightText={item.rightText}
              barClass={item.barClass}
            />
          ))}
        </div>
      ) : (
        <div className="h-24 rounded-2xl bg-gray-50 border border-dashed border-gray-200 flex items-center justify-center text-sm text-gray-400 font-bold">
          {emptyText}
        </div>
      )}
    </Card>
  );
}

function GraphBar({ label, value, maxValue, rightText, barClass }) {
  const width = maxValue > 0 ? (value / maxValue) * 100 : 0;
  const displayWidth = value > 0 ? Math.max(width, 8) : 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-black text-[#171425]">
          {label}
        </div>

        <div className="text-sm font-black text-[#ec4899]">
          {rightText}
        </div>
      </div>

      <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${barClass}`}
          style={{ width: `${displayWidth}%` }}
        />
      </div>
    </div>
  );
}

function VenueCompareGraph({ homeSummary, awaySummary }) {
  const maxGames = Math.max(homeSummary.games, awaySummary.games, 1);

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 text-[#ec4899] font-black">
            <MapPin size={18} />
            ホーム / アウェイ成績
          </div>

          <p className="text-xs text-gray-500 font-bold mt-1">
            会場別の勝敗と観戦数
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <VenueCompareRow
          label="HOME"
          summary={homeSummary}
          maxGames={maxGames}
          barClass="bg-[#ec4899]"
          badgeClass="bg-pink-100 text-[#ec4899]"
        />

        <VenueCompareRow
          label="AWAY"
          summary={awaySummary}
          maxGames={maxGames}
          barClass="bg-[#d6b36a]"
          badgeClass="bg-[#efe0b4] text-[#7a5519] border border-[#d6b36a]/40"
        />
      </div>
    </Card>
  );
}

function VenueCompareRow({ label, summary, maxGames, barClass, badgeClass }) {
  const width = maxGames > 0 ? (summary.games / maxGames) * 100 : 0;
  const displayWidth = summary.games > 0 ? Math.max(width, 8) : 0;

  return (
    <div className="bg-[#f8f7fb] rounded-2xl p-4 border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <div className={`text-[11px] font-black px-3 py-1 rounded-full ${badgeClass}`}>
          {label}
        </div>

        <div className="text-sm font-black text-[#171425]">
          {summary.games}試合
        </div>
      </div>

      <div className="h-4 bg-white rounded-full overflow-hidden border border-gray-100">
        <div
          className={`h-full rounded-full ${barClass}`}
          style={{ width: `${displayWidth}%` }}
        />
      </div>

      <div className="grid grid-cols-3 gap-2 mt-3">
        <div className="bg-white rounded-xl p-2 text-center border border-gray-100">
          <div className="text-lg font-black text-[#ec4899]">
            {summary.wins}
          </div>
          <div className="text-[10px] text-gray-400 font-black">
            勝ち
          </div>
        </div>

        <div className="bg-white rounded-xl p-2 text-center border border-gray-100">
          <div className="text-lg font-black text-gray-500">
            {summary.draws}
          </div>
          <div className="text-[10px] text-gray-400 font-black">
            引分
          </div>
        </div>

        <div className="bg-white rounded-xl p-2 text-center border border-gray-100">
          <div className="text-lg font-black text-red-400">
            {summary.losses}
          </div>
          <div className="text-[10px] text-gray-400 font-black">
            負け
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-3 text-[11px] font-bold text-gray-500">
        <span>勝率 {summary.winRate}%</span>
        <span>得点 {summary.goals} / 失点 {summary.conceded}</span>
      </div>
    </div>
  );
}

function CleanSheetGraph({ cleanSheets, totalGames, cleanSheetRate }) {
  const rate = Number(cleanSheetRate) || 0;

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 text-[#ec4899] font-black">
            <Shield size={18} />
            クリーンシート率
          </div>

          <p className="text-xs text-gray-500 font-bold mt-1">
            無失点で終えた観戦試合
          </p>
        </div>
      </div>

      {totalGames > 0 ? (
        <div className="flex items-center gap-5">
          <div
            className="w-28 h-28 rounded-full p-3 shrink-0"
            style={{
              background: `conic-gradient(#ec4899 ${rate}%, #ede9fe ${rate}% 100%)`,
            }}
          >
            <div className="w-full h-full rounded-full bg-white flex flex-col items-center justify-center shadow-inner">
              <div className="text-2xl font-black text-[#ec4899] leading-none">
                {cleanSheetRate}
              </div>
              <div className="text-[10px] font-black text-gray-400 mt-1">
                %
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="text-3xl font-black text-[#171425]">
              {cleanSheets}
              <span className="text-base text-gray-500 ml-1">
                試合
              </span>
            </div>

            <div className="text-sm text-gray-500 font-bold mt-2 leading-6">
              {totalGames}試合中、{cleanSheets}試合がクリーンシートです。
            </div>

            <div className="mt-3 bg-pink-50 text-[#ec4899] rounded-2xl px-3 py-2 text-xs font-black">
              守備の安定度を見える化
            </div>
          </div>
        </div>
      ) : (
        <div className="h-24 rounded-2xl bg-gray-50 border border-dashed border-gray-200 flex items-center justify-center text-sm text-gray-400 font-bold">
          まだクリーンシート記録がありません
        </div>
      )}
    </Card>
  );
}

function VenueStatCard({ label, records }) {
  const wins = records.filter((record) => record.result === 'win').length;
  const draws = records.filter((record) => record.result === 'draw').length;
  const losses = records.filter((record) => record.result === 'lose').length;

  return (
    <div className="bg-[#f8f7fb] rounded-2xl p-4 border border-gray-100">
      <div className="text-xs text-gray-500 font-black">{label}</div>
      <div className="text-3xl font-black text-[#ec4899] mt-1">
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
      <div className="flex items-center gap-2 text-[#ec4899] font-black mb-4">
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
                  ? 'bg-yellow-300 text-[#ec4899]'
                  : 'bg-pink-100 text-[#ec4899]'
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
    'CEREZO SUPPORTER',
    '桜色の記録者',
    'スタジアムの住人',
    '桜色の戦士',
    'スタジアムマスター',
    '勝利の目撃者',
    '桜色の戦術家',
    'レジェンドサポーター',
    '桜色の永久サポーター',
  ];

  return titles[Math.min(level, titles.length - 1)];
}

const profileShieldBadges = [
  {
    count: 10,
    title: 'BRONZE',
    name: '銅の盾',
    label: '10',
    condition: '観戦記録を10試合保存する',
    description: 'セレッソ観戦の第一歩を刻んだ証。',
    bg: 'linear-gradient(135deg, #fed7aa, #c2410c, #7c2d12)',
    text: '#fff7ed',
    border: 'rgba(255,255,255,0.55)',
  },
  {
    count: 25,
    title: 'SILVER',
    name: '銀の盾',
    label: '25',
    condition: '観戦記録を25試合保存する',
    description: '何度もスタジアムへ足を運んだサポーターの証。',
    bg: 'linear-gradient(135deg, #f8fafc, #94a3b8, #334155)',
    text: '#f8fafc',
    border: 'rgba(255,255,255,0.65)',
  },
  {
    count: 50,
    title: 'GOLD',
    name: '金の盾',
    label: '50',
    condition: '観戦記録を50試合保存する',
    description: '桜色の記憶を積み重ねた本格サポーターの証。',
    bg: 'linear-gradient(135deg, #fef3c7, #d6b36a, #92400e)',
    text: '#fff7ed',
    border: 'rgba(255,255,255,0.7)',
  },
  {
    count: 100,
    title: 'LEGEND',
    name: '伝説の盾',
    label: '100',
    condition: '観戦記録を100試合保存する',
    description: 'セレッソと歩んだ歴史そのもの。',
    bg: 'linear-gradient(135deg, #fce7f3, #be185d, #d6b36a)',
    text: '#ffffff',
    border: 'rgba(255,255,255,0.75)',
  },
];
const getProfileShieldBadge = (count) => {
  return [...profileShieldBadges]
    .reverse()
    .find((badge) => count >= badge.count) || null;
};
function MyPageView({ records, setView, profile }) {
  const [profilePhotoOpen, setProfilePhotoOpen] = useState(false);
  const supporterTitle = getSupporterTitle(records.length);
  const nextTitleCount = (Math.floor(records.length / 10) + 1) * 10;
  const remainingMatches = nextTitleCount - records.length;
  const favoriteCount = records.filter((record) => record.favorite).length;
  const [showAllAwayRecords, setShowAllAwayRecords] = useState(false);
  const [shieldListOpen, setShieldListOpen] = useState(false);
  const homeStadium = 'YANMAR HANASAKA STADIUM';

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
  const displayPhotoX = profile?.photoX ?? 50;
  const displayPhotoY = profile?.photoY ?? 50;
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



        <div
          onClick={() => setView('profileSettings')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setView('profileSettings');
            }
          }}
          className="relative overflow-hidden rounded-[1.8rem] bg-gradient-to-br from-[#831843] via-[#ec4899] to-[#d6b36a] text-white p-5 shadow-xl shadow-pink-900/25 mb-5 cursor-pointer active:scale-[0.98] transition"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(250,204,21,0.22),transparent_28%)]"></div>
          <div className="pointer-events-none absolute -right-10 -bottom-12 w-36 h-36 rounded-full border border-white/10"></div>

          <div className="flex justify-end mb-4">
            <div className="inline-flex items-center gap-1 text-[9px] font-black text-[#171425] bg-pink-50 border border-pink-100 rounded-full px-2 py-0.5">
              タップでプロフィールを編集できます
              <ChevronRight size={10} strokeWidth={3} />
            </div>
          </div>


          <div className="relative z-10 flex items-center gap-4">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();

                if (displayPhoto) {
                  setProfilePhotoOpen(true);
                }
              }}
              className="relative w-20 h-20 rounded-3xl bg-white text-[#ec4899] flex items-center justify-center shadow-xl border-2 border-yellow-300/70 overflow-hidden shrink-0 active:scale-95"
            >
              {displayPhoto ? (
                <>
                  <img
                    src={displayPhoto}
                    alt="profile"
                    className="w-full h-full object-cover"
                    style={{
                      objectPosition: `${displayPhotoX}% ${displayPhotoY}%`,
                    }}
                  />

                  <div className="absolute right-1 bottom-1 bg-black/45 text-white text-[9px] font-black rounded-full px-1.5 py-0.5">
                    拡大
                  </div>
                </>
              ) : (
                <User size={38} strokeWidth={2.5} />
              )}
            </button>

            <div className="flex-1 min-w-0">
              <div className="text-xs font-black text-yellow-300 tracking-[0.2em]">
                MY PROFILE
              </div>

              <div className="flex items-center justify-between gap-3 mt-1 w-full min-w-0">
                <h1 className="text-2xl font-black truncate min-w-0">
                  {displayName}さん
                </h1>

                {profileShieldBadge && (
                  <ProfileShieldBadge
                    badge={profileShieldBadge}
                    onClick={(e) => {
                      e.stopPropagation();
                      setShieldListOpen(true);
                    }}
                  />
                )}
              </div>

              <div className="inline-flex items-center gap-1 bg-[#d6b36a] text-[#831843] text-xs font-black px-3 py-1 rounded-full mt-2 shadow border border-yellow-100/70">
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

        {profilePhotoOpen && displayPhoto && (
          <div
            onClick={() => setProfilePhotoOpen(false)}
            className="fixed inset-0 z-[999] bg-black/75 backdrop-blur-sm flex items-center justify-center px-5"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm"
            >
              <button
                type="button"
                onClick={() => setProfilePhotoOpen(false)}
                className="absolute -top-12 right-0 text-white text-sm font-black bg-white/15 border border-white/20 rounded-full px-4 py-2 active:scale-95"
              >
                閉じる
              </button>

              <div className="bg-white rounded-[2rem] p-3 shadow-2xl">
                <img
                  src={displayPhoto}
                  alt="profile large"
                  className="w-full max-h-[70vh] object-contain rounded-[1.5rem]"
                />
              </div>
            </div>
          </div>
        )}

        {shieldListOpen && (
          <ShieldListModal
            recordsCount={records.length}
            onClose={() => setShieldListOpen(false)}
          />
        )}

        {/* 推し・よく行く場所 */}
        <Card>
          <div className="flex items-center gap-2 text-[#ec4899] font-black mb-4">
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
            <div className="flex items-center gap-2 text-[#ec4899] font-black">
              <Calendar size={18} />
              最新の観戦記録
            </div>

            <button
              type="button"
              onClick={() => setView('home')}
              className="text-xs font-black text-[#ec4899] flex items-center gap-1"
            >
              ホームへ
              <ChevronRight size={14} />
            </button>
          </div>

          {latestRecord ? (
            <div className="bg-[#f8f7fb] rounded-2xl p-3 border border-gray-100">
              <div className="text-[11px] text-[#ec4899] font-black">
                {latestRecord.date}
              </div>
              <div className="font-black text-sm mt-1">
                {latestRecord.score}
              </div>
              <div className="text-xs text-gray-500 font-bold mt-2 flex items-center gap-1">
                <MapPin size={12} />
                {latestRecord.stadium}
              </div>
              <span className="inline-block mt-3 bg-pink-100 text-[#ec4899] text-[10px] font-black px-3 py-1 rounded-full">
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
          <div className="flex items-center gap-2 text-[#ec4899] font-black mb-4">
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
  {
    name: 'エディオンピースウイング広島',
    short: 'Eピース',
    area: '広島',
    x: 25,
    y: 65,
    lx: 22,
    ly: 60,
  },
  {
    name: 'JFE晴れの国スタジアム',
    short: '岡山',
    area: '岡山',
    x: 30,
    y: 63,
    lx: 34,
    ly: 58,
  },
  {
    name: 'ノエビアスタジアム神戸',
    short: 'ノエスタ',
    area: '兵庫',
    x: 33,
    y: 63,
    lx: 35,
    ly: 69,
  },
  {
    name: 'パナソニック スタジアム 吹田',
    short: 'パナスタ',
    area: '大阪',
    x: 38,
    y: 64,
    lx: 48,
    ly: 58,
  },


  {
    name: 'YANMAR HANASAKA STADIUM',
    short: 'YANMAR',
    area: '大阪',
    x: 37,
    y: 64,
    lx: 50,
    ly: 68,
  },
  {
    name: 'サンガスタジアム by KYOCERA',
    short: 'サンガS',
    area: '京都',
    x: 36,
    y: 60,
    lx: 48,
    ly: 56,
  },
  {
    name: 'パロマ瑞穂スタジアム',
    short: '瑞穂',
    area: '愛知',
    x: 46,
    y: 61,
    lx: 56,
    ly: 57,
  },
  {
    name: 'IAIスタジアム日本平',
    short: 'アイスタ',
    area: '静岡',
    x: 53,
    y: 63,
    lx: 63,
    ly: 66,
  },
  {
    name: '味の素スタジアム',
    short: '味スタ',
    area: '東京',
    x: 59,
    y: 57,
    lx: 61,
    ly: 53,
  },
  {
    name: '国立競技場',
    short: '国立',
    area: '東京',
    x: 60,
    y: 56,
    lx: 72,
    ly: 52,
  },
  {
    name: '町田GIONスタジアム',
    short: '町田',
    area: '東京',
    x: 58,
    y: 60,
    lx: 59,
    ly: 63,
  },
  {
    name: 'Uvanceとどろきスタジアム by Fujitsu',
    short: '等々力',
    area: '神奈川',
    x: 60,
    y: 59,
    lx: 73,
    ly: 59,
  },
  {
    name: '日産スタジアム',
    short: '日産',
    area: '神奈川',
    x: 60,
    y: 62,
    lx: 73,
    ly: 65,
  },
  {
    name: '埼玉スタジアム2002',
    short: '埼スタ',
    area: '埼玉',
    x: 59,
    y: 53,
    lx: 72,
    ly: 50,
  },
  {
    name: 'フクダ電子アリーナ',
    short: 'フクアリ',
    area: '千葉',
    x: 63,
    y: 60,
    lx: 76,
    ly: 63,
  },
  {
    name: '三協フロンテア柏スタジアム',
    short: '柏',
    area: '千葉',
    x: 62,
    y: 56,
    lx: 75,
    ly: 56,
  },
  {
    name: 'メルカリスタジアム',
    short: 'カシマ',
    area: '茨城',
    x: 64,
    y: 54,
    lx: 77,
    ly: 53,
  },
  {
    name: '水戸信用金庫スタジアム',
    short: '水戸',
    area: '茨城',
    x: 62,
    y: 51,
    lx: 75,
    ly: 48,
  },
  {
    name: 'ベスト電器スタジアム',
    short: 'ベススタ',
    area: '福岡',
    x: 12,
    y: 65,
    lx: 15,
    ly: 66,
  },
  {
    name: 'PEACE STADIUM Connected by SoftBank',
    short: 'ピースタ',
    area: '長崎',
    x: 7,
    y: 76,
    lx: 12,
    ly: 81,
  },
];


function StadiumMapSection({ records }) {
  const [selectedStadiumName, setSelectedStadiumName] = useState(null);
  const mapPinOffset = {
    x: 0,
    y: 0,
  };
  const [showUnvisitedPins, setShowUnvisitedPins] = useState(false);

  const visitedStadiums = records.reduce((acc, record) => {
    const stadiumName = record.draftData?.stadium || record.stadium;

    const point = stadiumMapPoints.find((stadium) => {
      return stadium.name === stadiumName;
    });

    if (!point) return acc;

    if (!acc[point.name]) {
      acc[point.name] = {
        ...point,
        count: 0,
        latestDate: record.date,
        records: [],
      };
    }

    acc[point.name].count += 1;
    acc[point.name].records.push(record);

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
        <div className="flex items-center gap-2 text-[#ec4899] font-black">
          <MapPin size={18} />
          観戦マップ
        </div>

        <div className="text-xs font-black text-gray-500">
          {visitedCount}スタジアム訪問
        </div>
      </div>

      <p className="text-xs text-gray-500 font-bold mb-4">
        観戦したスタジアムが桜色で表示されます。ピンを押すと記録を確認できます。

        <div className="flex justify-end mb-3">
          <button
            type="button"
            onClick={() => setShowUnvisitedPins(!showUnvisitedPins)}
            className={`text-[10px] font-black rounded-full px-3 py-1.5 border active:scale-95 ${showUnvisitedPins
              ? 'bg-[#ec4899] text-white border-[#ec4899]'
              : 'bg-white text-gray-500 border-gray-200'
              }`}
          >
            {showUnvisitedPins ? '未訪問も表示中' : '未訪問も表示'}
          </button>
        </div>
      </p>

      <div className="relative w-full aspect-[1415/1112] rounded-[1.8rem] overflow-hidden bg-white border border-pink-100 shadow-inner">
        {/* リアル日本地図 */}
        <img
          src="/japan-map(1).png"
          alt="日本地図"
          className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
        />

        {/* 少し白をかぶせて、ピンを見やすくする */}
        <div className="absolute inset-0 bg-white/20 pointer-events-none"></div>

        {/* タイトル */}
        <div className="absolute left-4 top-4 z-30">
          <div className="text-[10px] font-black text-[#ec4899] tracking-[0.28em] bg-white/90 rounded-full px-2 py-1 shadow-sm">
            CEREZO AWAY MAP
          </div>
          <div className="text-xs font-black text-[#171425] mt-1 bg-white/90 rounded-full px-2 py-1 shadow-sm inline-block">
            スタジアム遠征記録
          </div>
        </div>

        {/* 凡例 */}
        <div className="absolute right-3 top-3 z-30 bg-white/90 backdrop-blur-sm rounded-2xl px-3 py-2 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 text-[10px] font-black text-gray-500">
            <span className="w-3 h-3 rounded-full bg-[#ec4899] inline-block border border-yellow-300"></span>
            訪問済み
          </div>
          <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 mt-1">
            <span className="w-3 h-3 rounded-full bg-white inline-block border border-gray-300"></span>
            未訪問
          </div>
        </div>

        {/* スタジアムピン */}
        {stadiumMapPoints.map((point) => {
          const visited = visitedStadiums[point.name];
          const isSelected = selectedStadiumName === point.name;

          // 未訪問を表示OFFのときは出さない
          if (!visited && !showUnvisitedPins && !isSelected) {
            return null;
          }

          return (
            <React.Fragment key={point.name}>
              <button
                type="button"
                onClick={() => setSelectedStadiumName(point.name)}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 active:scale-95"
                style={{
                  left: `${point.x + mapPinOffset.x}%`,
                  top: `${point.y + mapPinOffset.y}%`,
                }}
              >
                <div
                  className={`relative rounded-full flex items-center justify-center font-black border ${visited
                    ? 'w-7 h-7 text-[10px] bg-[#ec4899] text-white border-yellow-300 shadow-lg shadow-pink-900/20'
                    : 'w-3 h-3 text-[0px] bg-white/80 border-gray-300 shadow-sm opacity-80'
                    } ${isSelected ? 'ring-4 ring-pink-200 scale-125' : ''}`}
                >
                  {visited ? visited.count : ''}
                </div>
              </button>

              {isSelected && (
                <div
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none"
                  style={{
                    left: `${point.lx + mapPinOffset.x}%`,
                    top: `${point.ly + mapPinOffset.y}%`,
                  }}
                >
                  <div className="bg-white/95 border border-pink-100 rounded-full px-2.5 py-1 shadow-sm text-[9px] font-black text-[#ec4899] whitespace-nowrap">
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
                <div className="text-2xl font-black text-[#ec4899]">
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
                  <div className="text-[11px] text-[#ec4899] font-black">
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

  const homeStadium = 'YANMAR HANASAKA STADIUM';

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
        <div className="flex items-center gap-2 text-[#ec4899] font-black">
          <Train size={18} />
          遠征記録
        </div>

        <div className="text-xs font-black text-gray-500">
          {awayRecords.length}試合
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-pink-50 rounded-2xl p-4">
          <div className="text-xs text-gray-500 font-black">遠征試合数</div>
          <div className="text-2xl font-black text-[#ec4899] mt-1">
            {awayRecords.length}
            <span className="text-sm text-gray-500 ml-1">試合</span>
          </div>
        </div>

        <div className="bg-pink-50 rounded-2xl p-4">
          <div className="text-xs text-gray-500 font-black">訪問スタジアム</div>
          <div className="text-2xl font-black text-[#ec4899] mt-1">
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
                    <div className="text-[11px] text-[#ec4899] font-black">
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

                  <div className="bg-[#dbeafe] text-[#1d4ed8] rounded-full px-3 py-1 text-[10px] font-black shrink-0">
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
              className="w-full mt-4 bg-pink-50 text-[#ec4899] border border-pink-100 rounded-2xl py-3 text-sm font-black active:scale-[0.98]"
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
  const photoDragRef = useRef(null);

  const stadiumOptions = [
    'エディオンピースウイング広島',
    ...new Set(opponentTeams.map((team) => team.stadium)),
    '国立競技場',
    'YANMAR HANASAKA STADIUM',
    'ヤマハスタジアム',
    'デンカビッグスワンスタジアム',
  ];

  const updateForm = (updates) => {
    setForm({ ...form, ...updates });
  };

  const clampPhotoPosition = (value) => {
    return Math.max(0, Math.min(100, value));
  };

  const handlePhotoPointerDown = (e) => {
    if (!form.photo) return;

    e.currentTarget.setPointerCapture?.(e.pointerId);

    photoDragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      photoX: form.photoX ?? 50,
      photoY: form.photoY ?? 50,
    };
  };

  const handlePhotoPointerMove = (e) => {
    if (!photoDragRef.current) return;

    const diffX = e.clientX - photoDragRef.current.startX;
    const diffY = e.clientY - photoDragRef.current.startY;

    updateForm({
      photoX: clampPhotoPosition(photoDragRef.current.photoX - diffX * 0.45),
      photoY: clampPhotoPosition(photoDragRef.current.photoY - diffY * 0.45),
    });
  };

  const handlePhotoPointerUp = () => {
    photoDragRef.current = null;
  };

  const resetPhotoPosition = () => {
    updateForm({
      photoX: 50,
      photoY: 50,
    });
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
    updateForm({
      photo: null,
      photoX: 50,
      photoY: 50,
    });
  };

  return (
    <div className="min-h-screen bg-[#f8f7fb] pb-28">
      <BrandHeader back="home" setView={setView} />

      <section className="px-5 py-6">
        <div className="mb-5">
          <div className="flex items-center gap-2 text-[#ec4899] font-black text-sm mb-1">
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
                <div
                  onPointerDown={handlePhotoPointerDown}
                  onPointerMove={handlePhotoPointerMove}
                  onPointerUp={handlePhotoPointerUp}
                  onPointerCancel={handlePhotoPointerUp}
                  className="relative w-28 h-28 rounded-3xl bg-pink-50 text-[#ec4899] border-2 border-pink-100 flex items-center justify-center overflow-hidden shrink-0 touch-none cursor-grab active:cursor-grabbing"
                >
                  {form.photo ? (
                    <>
                      <img
                        src={form.photo}
                        alt="profile preview"
                        className="w-full h-full object-cover select-none pointer-events-none"
                        draggable={false}
                        style={{
                          objectPosition: `${form.photoX ?? 50}% ${form.photoY ?? 50}%`,
                        }}
                      />

                      <div className="absolute left-2 right-2 bottom-2 bg-black/45 text-white text-[9px] font-black rounded-full py-1 text-center">
                        ドラッグで調整
                      </div>
                    </>
                  ) : (
                    <User size={40} />
                  )}
                </div>

                <div className="flex-1">
                  <label className="inline-flex items-center justify-center gap-2 bg-[#ec4899] text-white text-sm font-black px-4 py-3 rounded-2xl shadow-lg shadow-pink-900/20 cursor-pointer active:scale-95">
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
                <div className="mt-4 bg-pink-50 border border-pink-100 rounded-2xl p-3">
                  <div className="text-xs font-black text-[#ec4899]">
                    写真の位置調整
                  </div>

                  <p className="text-[11px] text-gray-500 font-bold mt-1 leading-5">
                    写真を指でドラッグして、中央に来るように調整できます。
                  </p>

                  <button
                    type="button"
                    onClick={resetPhotoPosition}
                    className="mt-3 bg-white text-[#ec4899] border border-pink-100 rounded-xl px-3 py-2 text-xs font-black active:scale-[0.98]"
                  >
                    リセット
                  </button>
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
                value={form.favoritePlayer || ''}
                onChange={(e) => updateForm({ favoritePlayer: e.target.value })}
                className="field"
              >
                <option value="">選択してください</option>

                {getSeasonPlayerOptions('2026-27').map((player) => (
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

          <div className="relative overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-[#831843] via-[#ec4899] to-[#d6b36a] text-white p-4">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-2xl bg-white text-[#ec4899] flex items-center justify-center border-2 border-yellow-300/70 overflow-hidden">
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

function ShieldListModal({ recordsCount, onClose }) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm flex items-center justify-center px-5"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm bg-white rounded-[2rem] shadow-2xl overflow-hidden"
      >
        <div className="bg-gradient-to-br from-[#831843] via-[#ec4899] to-[#d6b36a] text-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-black text-yellow-300 tracking-[0.2em]">
                SHIELD COLLECTION
              </div>
              <div className="text-xl font-black mt-1">
                盾一覧
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="bg-white/15 border border-white/20 rounded-full px-3 py-1.5 text-xs font-black active:scale-95"
            >
              閉じる
            </button>
          </div>

          <div className="text-xs text-white/80 font-bold mt-3">
            現在の観戦記録：{recordsCount}試合
          </div>
        </div>

        <div className="p-4 space-y-3 max-h-[65vh] overflow-y-auto">
          {profileShieldBadges.map((badge) => {
            const unlocked = recordsCount >= badge.count;
            const remaining = Math.max(badge.count - recordsCount, 0);

            return (
              <div
                key={badge.title}
                className={`rounded-2xl border p-3 flex gap-3 ${unlocked
                  ? 'bg-pink-50 border-pink-100'
                  : 'bg-gray-50 border-gray-100 opacity-75'
                  }`}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex flex-col items-center justify-center shrink-0 shadow-md border"
                  style={{
                    background: unlocked ? badge.bg : 'linear-gradient(135deg, #e5e7eb, #9ca3af)',
                    color: unlocked ? badge.text : '#ffffff',
                    borderColor: badge.border,
                  }}
                >
                  <Shield size={28} fill="currentColor" strokeWidth={0} />
                  <div className="text-xs font-black leading-none mt-1">
                    {badge.label}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-sm font-black text-[#171425]">
                      {badge.name}
                    </div>

                    <div
                      className={`text-[10px] font-black rounded-full px-2 py-1 ${unlocked
                        ? 'bg-[#ec4899] text-white'
                        : 'bg-gray-200 text-gray-500'
                        }`}
                    >
                      {unlocked ? 'GET' : `あと${remaining}試合`}
                    </div>
                  </div>

                  <div className="text-[11px] text-[#ec4899] font-black mt-1">
                    {badge.condition}
                  </div>

                  <p className="text-[11px] text-gray-500 font-bold mt-1 leading-5">
                    {badge.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ProfileShieldBadge({ badge, onClick }) {
  const Wrapper = onClick ? 'button' : 'div';

  return (
    <Wrapper
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className="w-[72px] h-[78px] shrink-0 rounded-2xl flex flex-col items-center justify-center shadow-lg border border-white/60 active:scale-95 transition"
      style={{
        background: badge.bg,
        color: badge.text,
      }}
      title={`${badge.name} / ${badge.count}試合達成`}
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
    </Wrapper>
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
      <div className="w-10 h-10 rounded-xl bg-pink-100 text-[#ec4899] flex items-center justify-center shrink-0">
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
          <div className="text-[11px] text-[#ec4899] font-black mt-1">
            背番号 {player.number} / {player.position}
          </div>
        )}
      </div>

      {player && (
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#ec4899] to-[#831843] text-white flex flex-col items-center justify-center shadow-md shrink-0">
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
      <div className="w-10 h-10 rounded-xl bg-pink-100 text-[#ec4899] flex items-center justify-center shrink-0">
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
      <BrandHeader back="home" setView={setView} />

      <section className="px-5 py-6">
        <div className="mb-5">
          <div className="flex items-center gap-2 text-[#ec4899] font-black text-sm mb-1">
            <Calendar size={18} />
            ATTENDANCE CALENDAR
          </div>

          <h1 className="text-2xl font-black text-[#171425]">
            参戦カレンダー
          </h1>

          <p className="text-xs text-gray-500 font-bold mt-1">
            行った試合の日に桜色のマークが付きます
          </p>
        </div>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={() => moveMonth(-1)}
              className="w-10 h-10 rounded-full bg-pink-50 text-[#ec4899] flex items-center justify-center"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="text-lg font-black text-[#171425]">
              {year}年 {month + 1}月
            </div>

            <button
              type="button"
              onClick={() => moveMonth(1)}
              className="w-10 h-10 rounded-full bg-pink-50 text-[#ec4899] flex items-center justify-center"
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
                    ? 'bg-[#ec4899] text-white shadow-md shadow-pink-900/20'
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
            <div className="font-black text-[#ec4899]">
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
                    <div className="text-[11px] text-[#ec4899] font-black">
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
    title: 'はじめての桜色',
    description: '初めて観戦記録を作成',
    icon: <Ticket size={24} />,
    condition: (stats) => stats.total >= 1,
    progress: (stats) => `${Math.min(stats.total, 1)}/1`,
  },
  {
    id: 'five-matches',
    title: '桜色の常連',
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
    title: '桜色の民',
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
    return data.venueType === 'HOME' || record.stadium === cerezoTeam.stadium || record.stadium?.includes('YANMAR HANASAKA');
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
      <BrandHeader back="home" setView={setView} />

      <section className="px-5 py-6">
        <div className="mb-5">
          <div className="flex items-center gap-2 text-[#ec4899] font-black text-sm mb-1">
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

              <div className="text-3xl font-black text-[#ec4899] mt-1">
                {unlockedBadges.length}
                <span className="text-sm text-gray-400 ml-1">
                  / {badgeDefinitions.length}
                </span>
              </div>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ec4899] to-[#831843] text-white flex items-center justify-center shadow-lg shadow-pink-900/20">
              <Medal size={32} />
            </div>
          </div>

          <div className="mt-4 h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#ec4899] rounded-full"
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
                  ? 'bg-white border-pink-100'
                  : 'bg-gray-50 border-gray-100 opacity-60'
                  }`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-3 ${unlocked
                    ? 'bg-gradient-to-br from-[#ec4899] to-[#831843] text-white shadow-md shadow-pink-900/20'
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
                      ? 'bg-pink-100 text-[#ec4899]'
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
      <BrandHeader back="home" setView={setView} />

      <section className="px-5 py-6">
        <div className="mb-5">
          <div className="flex items-center gap-2 text-[#ec4899] font-black text-sm mb-1">
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
            <div className="font-black text-[#ec4899]">
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
                      <div className="text-[11px] text-[#ec4899] font-black">
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
                        <span className="inline-block mt-2 bg-pink-100 text-[#ec4899] text-[9px] font-black px-2 py-1 rounded-full">
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
          <div className="h-[70px] px-5 bg-gradient-to-r from-[#831843] to-[#ec4899] text-white flex items-center justify-between shrink-0 shadow-md">
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
      className="w-full flex items-center gap-3 bg-[#f8f7fb] rounded-2xl p-3 border border-gray-100 text-left hover:bg-pink-50"
    >
      <div className="w-10 h-10 rounded-xl bg-white text-[#ec4899] flex items-center justify-center shadow-sm shrink-0">
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
      <div className="flex items-center gap-1 text-[#ec4899] text-xs font-bold mb-2">
        {icon} {label}
      </div>
      <div className="text-3xl font-black text-[#ec4899]">
        {value} <span className="text-xs text-gray-500 font-bold">{unit}</span>
      </div>
    </div>
  );
}

const getTicketScoreData = (record) => {
  const data = record.draftData || {};
  const scoreMatch = record.score?.match(/(\d+)\s*-\s*(\d+)/);

  const cerezoScore = data.homeScore !== undefined && data.homeScore !== ''
    ? Number(data.homeScore)
    : Number(scoreMatch?.[1] || 0);

  const opponentScore = data.awayScore !== undefined && data.awayScore !== ''
    ? Number(data.awayScore)
    : Number(scoreMatch?.[2] || 0);

  const result = cerezoScore > opponentScore
    ? 'WIN'
    : cerezoScore === opponentScore
      ? 'DRAW'
      : 'LOSE';

  return { cerezoScore, opponentScore, result };
};

const getTicketOpponent = (record) => {
  const opponentName = record.draftData?.opponent || record.opponent || '';

  return opponentTeams.find((team) =>
    team.name === opponentName ||
    team.short === opponentName ||
    opponentName.includes(team.short) ||
    opponentName.includes(team.name)
  ) || {
    name: opponentName || '対戦相手',
    short: opponentName ? opponentName.replace('セレッソ大阪', '').trim() : '相手',
    main: '#ec4899',
    sub: '#d6b36a',
  };
};

const getTicketMatchMeta = (record) => {
  const data = record.draftData || {};
  const scheduleMatch = getScheduleMatchFromRecord(record);
  const seasonInfo = getSeasonInfo(data.season || record.season || '2026-27');
  const opponent = getTicketOpponent(record);

  const rawTournament = data.tournament || seasonInfo.tournament || 'J1リーグ';
  const tournament = rawTournament.includes('ルヴァン')
    ? 'ルヴァンカップ'
    : rawTournament.includes('百年')
      ? '百年構想リーグ'
      : rawTournament.includes('天皇杯')
        ? '天皇杯'
        : 'J1リーグ';

  const section = data.matchSection || scheduleMatch?.section || '';
  const venueType = data.venueType || scheduleMatch?.venueType || ((record.stadium === cerezoTeam.stadium || record.stadium?.includes('YANMAR HANASAKA')) ? 'HOME' : 'AWAY');
  const date = data.date ? data.date.replaceAll('-', '.') : record.date || '';
  const time = scheduleMatch?.time && scheduleMatch.time !== '未定' ? `${scheduleMatch.time} KICK OFF` : '';
  const stadium = data.stadium || record.stadium || scheduleMatch?.stadium || '';

  return {
    season: data.season || record.season || '2026-27',
    date,
    tournament,
    section,
    venueType,
    time,
    stadium,
    opponent,
    seat: [data.seat, data.seatBlock, data.seatRow, data.seatNumber]
      .filter(Boolean)
      .join(' '),
  };
};

const getTicketRareBadges = (record) => {
  const data = record.draftData || {};
  const { result, cerezoScore } = getTicketScoreData(record);
  const tags = data.tags || (record.tag ? [record.tag] : []);
  const badges = [];

  if (tags.some((tag) => String(tag).includes('初'))) badges.push('初観戦');
  if (tags.some((tag) => String(tag).includes('逆転'))) badges.push('劇的逆転勝利');
  if (tags.some((tag) => String(tag).includes('ダービー'))) badges.push('ダービー');
  if (data.weather && String(data.weather).includes('雨')) badges.push('雨の観戦');
  if (result === 'WIN' && cerezoScore >= 4) badges.push('ゴールラッシュ');
  if ((data.photos || []).length >= 3) badges.push('フォトメモリー');
  if (moneyToNumber(data.expenses?.ticket) + moneyToNumber(data.expenses?.goods) + moneyToNumber(data.expenses?.food) + moneyToNumber(data.expenses?.transport) + moneyToNumber(data.expenses?.other) >= 20000) badges.push('豪遊遠征');

  return badges.slice(0, 3);
};

function TicketCollectionView({ records, setView, onOpenDetail }) {
  const [activeSeason, setActiveSeason] = useState('all');
  const [rareInfoOpen, setRareInfoOpen] = useState(false);

  const sortedRecords = [...records].sort((a, b) => {
    const aDate = normalizeDate(a.draftData?.date || a.date);
    const bDate = normalizeDate(b.draftData?.date || b.date);
    return new Date(bDate) - new Date(aDate);
  });

  const filteredRecords = sortedRecords.filter((record) => {
    if (activeSeason === 'all') return true;
    if (activeSeason === 'rare') return getTicketRareBadges(record).length > 0;
    return getRecordSeason(record) === activeSeason;
  });

  const winCount = records.filter((record) => getTicketScoreData(record).result === 'WIN').length;
  const stadiumCount = new Set(records.map((record) => record.stadium).filter(Boolean)).size;
  const rareCount = records.filter((record) => getTicketRareBadges(record).length > 0).length;

  return (
    <div className="min-h-screen bg-[#08031d] text-white pb-24">
      <div className="relative overflow-hidden min-h-screen">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(236,72,153,0.34),transparent_35%),radial-gradient(circle_at_95%_22%,rgba(214,179,106,0.18),transparent_32%),linear-gradient(180deg,#831843_0%,#be185d_45%,#451a03_100%)]"></div>
        <div className="absolute inset-x-0 top-0 h-48 bg-[linear-gradient(120deg,rgba(255,255,255,0.08)_0%,transparent_38%,rgba(214,179,106,0.18)_100%)]"></div>

        <div className="relative z-10 px-4 pt-5">
          <div className="flex items-center justify-between mb-5">
            <button
              type="button"
              onClick={() => setView('home')}
              className="w-11 h-11 rounded-2xl bg-white/8 border border-white/10 flex items-center justify-center active:scale-95"
            >
              <ChevronLeft size={25} strokeWidth={2.8} />
            </button>

            <div className="text-center">
              <h1 className="text-[24px] font-black tracking-tight">チケットコレクション</h1>
              <p className="text-[10px] tracking-[0.24em] text-white/50 font-black mt-1">MATCH MEMORY TICKETS</p>
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => setRareInfoOpen(!rareInfoOpen)}
                className="w-11 h-11 rounded-2xl bg-white/8 border border-white/10 flex items-center justify-center active:scale-95"
              >
                <MoreHorizontal size={24} />
              </button>

              {rareInfoOpen && (
                <div className="absolute right-0 top-[54px] w-[285px] rounded-[1.6rem] bg-white text-[#171425] shadow-2xl border border-pink-100 p-4 z-[999]">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="text-[10px] font-black text-[#ec4899] tracking-[0.22em]">
                        RARE TICKET
                      </div>
                      <div className="text-base font-black mt-1">
                        レアチケットの表示条件
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setRareInfoOpen(false)}
                      className="text-[10px] font-black text-gray-400"
                    >
                      閉じる
                    </button>
                  </div>

                  <p className="text-xs text-gray-500 font-bold leading-5 mb-3">
                    下の条件に1つでも当てはまると、チケットにレアバッジが付きます。
                  </p>

                  <div className="space-y-2">
                    <RareConditionItem
                      icon={<TagIcon size={15} />}
                      title="初観戦"
                      desc="タグに「初」が含まれている"
                    />

                    <RareConditionItem
                      icon={<TagIcon size={15} />}
                      title="劇的逆転勝利"
                      desc="タグに「逆転」が含まれている"
                    />

                    <RareConditionItem
                      icon={<TagIcon size={15} />}
                      title="ダービー"
                      desc="タグに「ダービー」が含まれている"
                    />

                    <RareConditionItem
                      icon={<Sun size={15} />}
                      title="雨の観戦"
                      desc="天気に「雨」が含まれている"
                    />

                    <RareConditionItem
                      icon={<Trophy size={15} />}
                      title="ゴールラッシュ"
                      desc="勝利して、セレッソが4得点以上"
                    />

                    <RareConditionItem
                      icon={<ImageIcon size={15} />}
                      title="フォトメモリー"
                      desc="写真を3枚以上登録している"
                    />

                    <RareConditionItem
                      icon={<Wallet size={15} />}
                      title="豪遊遠征"
                      desc="観戦費用の合計が20,000円以上"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-4 rounded-[1.35rem] border border-white/10 bg-white/[0.07] backdrop-blur-xl shadow-2xl shadow-pink-950/30 divide-x divide-white/10 overflow-hidden mb-4">
            <TicketStat icon={<Ticket size={16} />} label="コレクション" value={records.length} unit="枚" />
            <TicketStat icon={<Trophy size={16} />} label="勝利" value={winCount} unit="試合" />
            <TicketStat icon={<Building2 size={16} />} label="スタジアム" value={stadiumCount} unit="ヶ所" />
            <TicketStat icon={<Star size={16} />} label="レア" value={rareCount} unit="枚" gold />
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 mb-4 ticket-tab-scroll">
            <TicketFilterButton active={activeSeason === 'all'} onClick={() => setActiveSeason('all')}>すべて</TicketFilterButton>
            {seasonOptions.map((season) => (
              <TicketFilterButton
                key={season.key}
                active={activeSeason === season.key}
                onClick={() => setActiveSeason(season.key)}
              >
                {season.key === '2026-27' ? '2026/27' : '百年構想'}
              </TicketFilterButton>
            ))}
            <TicketFilterButton active={activeSeason === 'rare'} onClick={() => setActiveSeason('rare')}>レア</TicketFilterButton>
          </div>

          {filteredRecords.length === 0 ? (
            <div className="mt-16 text-center px-6">
              <div className="mx-auto w-20 h-20 rounded-[1.7rem] bg-white/8 border border-white/10 flex items-center justify-center text-pink-200 mb-5">
                <Ticket size={40} />
              </div>
              <h2 className="text-xl font-black">まだチケットがありません</h2>
              <p className="text-sm text-white/55 font-bold leading-6 mt-3">
                観戦記録を保存すると、ここに思い出のチケットが自動で追加されます。
              </p>
              <button
                type="button"
                onClick={() => setView('step1')}
                className="mt-6 bg-white text-[#ec4899] rounded-full px-6 py-3 text-sm font-black shadow-lg active:scale-95"
              >
                最初のチケットを作る
              </button>
            </div>
          ) : (
            <>
              <div className="ticket-list-hint">
                タップで詳細を表示
              </div>

              <div className="space-y-4">
                {filteredRecords.map((record) => (
                  <MemoryTicketCard
                    key={record.id}
                    record={record}
                    onOpenDetail={() => onOpenDetail(record, 'tickets')}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function TicketStat({ icon, label, value, unit, gold }) {
  return (
    <div className="px-2 py-3 text-center min-w-0">
      <div className={`flex items-center justify-center gap-1 text-[10px] font-black ${gold ? 'text-yellow-300' : 'text-pink-200'}`}>
        {icon}
        <span className="truncate">{label}</span>
      </div>
      <div className="mt-1 text-[24px] font-black leading-none">
        {value}<span className="text-[10px] font-bold text-white/70 ml-1">{unit}</span>
      </div>
    </div>
  );
}
function RareConditionItem({ icon, title, desc }) {
  return (
    <div className="flex gap-3 rounded-2xl bg-pink-50 border border-pink-100 px-3 py-2.5">
      <div className="w-8 h-8 rounded-xl bg-white text-[#ec4899] flex items-center justify-center shrink-0 shadow-sm">
        {icon}
      </div>

      <div className="min-w-0">
        <div className="text-xs font-black text-[#ec4899]">
          {title}
        </div>
        <div className="text-[11px] font-bold text-gray-500 leading-5 mt-0.5">
          {desc}
        </div>
      </div>
    </div>
  );
}

function TicketFilterButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-black border active:scale-95 ${active
        ? 'bg-gradient-to-r from-[#be185d] to-[#d6b36a] text-white border-pink-300/30 shadow-lg shadow-pink-950/30'
        : 'bg-white/7 text-white/65 border-white/10'
        }`}
    >
      {children}
    </button>
  );
}


function TicketStadiumIllustration({ away = false }) {
  return (
    <svg viewBox="0 0 120 120" className="stadium-svg" aria-hidden="true">
      <defs>
        <linearGradient id="ticketBadgeFill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.04" />
        </linearGradient>

        <linearGradient id="ticketBadgeStroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="100%" stopColor="#d8c9ff" stopOpacity="0.62" />
        </linearGradient>
      </defs>

      {/* crown */}
      <path
        className="badge-crown"
        d="M35 25l9 10 16-13 16 13 9-10 6 18H29l6-18Z"
      />

      {/* shield */}
      <path
        className="badge-shield"
        d="M60 108C35 95 26 77 26 48V40c13-2 24-7 34-16c10 9 21 14 34 16v8c0 29-9 47-34 60Z"
      />

      {/* inner shield */}
      <path
        className="badge-shield-inner"
        d="M60 99C40 88 33 73 33 49v-3c10-2 19-6 27-13c8 7 17 11 27 13v3c0 24-7 39-27 50Z"
      />

      {/* vertical stripes */}
      <path className="badge-stripe" d="M49 39v43" />
      <path className="badge-stripe" d="M60 35v51" />
      <path className="badge-stripe" d="M71 39v43" />

      {/* football */}
      <circle className="badge-ball" cx="60" cy="61" r="9" />
      <path
        className="badge-ball-lines"
        d="M60 52l4 3-1 5h-6l-1-5 4-3Zm-8 10l5 2m11-2l-5 2m-8 6l5-2m11 2l-5-2"
      />

      {/* wing accents */}
      <path className="badge-wing" d="M24 54c8-6 14-7 20-5" />
      <path className="badge-wing" d="M96 54c-8-6-14-7-20-5" />

      {/* away spark */}
      {away && (
        <>
          <path className="badge-spark" d="M18 42l4 4-4 4-4-4 4-4Z" />
          <path className="badge-spark" d="M102 42l4 4-4 4-4-4 4-4Z" />
        </>
      )}
    </svg>
  );
}
function MemoryTicketCard({ record, onOpenDetail }) {
  const meta = getTicketMatchMeta(record);
  const opponent = meta.opponent;
  const { cerezoScore, opponentScore, result } = getTicketScoreData(record);
  const data = record.draftData || {};
  const rareBadges = getTicketRareBadges(record);

  // 背景は「試合が行われたスタジアム」の写真
  const stadiumImage = getStadiumImage(meta.stadium);

  const mainColor = meta.venueType === 'HOME' ? cerezoTeam.main : opponent.main;
  const accentColor = rareBadges.length ? '#d6b36a' : (opponent.main || '#be185d');

  return (
    <button
      type="button"
      className="ticket-single"
      onClick={onOpenDetail}
      aria-label={`${cerezoTeam.short} vs ${opponent.short} のチケット詳細を開く`}
      style={{
        '--ticket-main': mainColor,
        '--ticket-accent': accentColor,
        '--ticket-img': `url(${stadiumImage})`,
      }}
    >
      <div className="ticket-front-single">
        <div className="ticket-main-panel">
          <div className="ticket-left-icon">
            <div className="stadium-mark">
              <TicketStadiumIllustration away={meta.venueType === 'AWAY'} />
            </div>

            <div className="ticket-home-away">
              {meta.venueType === 'HOME' ? 'HOME GAME' : 'AWAY GAME'}
            </div>
          </div>

          <div className="ticket-info-panel">
            <div className="ticket-meta-line">
              <span>{String(meta.date).slice(0, 4) || '2026'}</span>
              <span>{meta.tournament}</span>
              {meta.section && <span>第{meta.section}節</span>}
            </div>

            <div className="ticket-match-title">
              <span>{cerezoTeam.short}</span>
              <b>vs</b>
              <span>{opponent.short}</span>
            </div>

            <div className="ticket-date-line">
              {meta.date} {meta.time}
            </div>

            <div className="ticket-place-line">
              <MapPin size={14} />
              <span>{meta.stadium}</span>
            </div>

            {rareBadges[0] && (
              <div className="ticket-rare-chip">
                <Star size={13} fill="currentColor" />
                {rareBadges[0]}
              </div>
            )}
          </div>
        </div>

        <TicketStub
          score={`${cerezoScore} - ${opponentScore}`}
          result={result}
          mvp={data.mvp || '未設定'}
          rating={data.rating || 0}
        />

        <div className="ticket-barcode-rail">
          <div className="barcode-lines"></div>
          <div className="rail-text">CEREZO OSAKA</div>
        </div>
      </div>


    </button>
  );
}

function TicketStub({ score, result, mvp, rating }) {
  return (
    <div className="ticket-stub-panel">
      <div className="ticket-score-text">{score} <span>{result === 'WIN' ? '○' : result === 'DRAW' ? '△' : '●'}</span></div>
      <div className="ticket-result-text">{result}</div>
      <div className="ticket-mom-label">MOM</div>
      <div className="ticket-mom-name">{mvp}</div>
      <TicketStars rating={rating} />
    </div>
  );
}

function TicketStars({ rating }) {
  const count = Math.max(0, Math.min(5, Number(rating) || 0));
  return (
    <div className="ticket-stars" aria-label={`${count} stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} size={16} fill={index < count ? 'currentColor' : 'none'} strokeWidth={2.4} />
      ))}
    </div>
  );
}

function InfoMini({ icon, label, value, image }) {
  return (
    <div className="info-mini">
      <div className="text-[#5b21b6] shrink-0">{icon}</div>
      <div className="min-w-0 flex-1">
        <div className="text-[11px] font-black text-[#5b21b6]">{label}</div>
        <div className="text-[12px] font-black text-[#171425] truncate">{value}</div>
      </div>
      {image && <img src={image} alt={label} className="w-10 h-10 rounded-xl object-cover shrink-0" />}
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
        className="relative -top-5 w-16 h-16 rounded-full bg-[#ec4899] flex items-center justify-center shadow-lg shadow-pink-900/25"
      >
        <div className="w-12 h-12 rounded-full bg-[#ec4899] text-white flex flex-col items-center justify-center">
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
      className={`flex flex-col items-center gap-1 ${active ? 'text-[#ec4899]' : 'text-gray-500'
        }`}
    >
      {icon}
      <span className="text-[10px] font-bold">{label}</span>
    </button>
  );
}

function CreateShell({ children, setView, backTo, step, onSaveDraft, hideStepIndicator = false }) {
  return (
    <div className="min-h-screen bg-[#f8f7fb]">
      <BrandHeader back={backTo} setView={setView} />

      <div className="-mt-1 bg-white rounded-t-[2.2rem] min-h-screen px-4 pt-8 pb-40 shadow-[0_-10px_25px_rgba(24,7,55,0.08)]">
        <h1 className="text-center text-[24px] font-black tracking-tight text-[#171425] mb-7">
          観戦記録を作成
        </h1>

        {!hideStepIndicator && <StepIndicator step={step} />}
        {onSaveDraft && (
          <div className="mt-3 flex justify-end">
            <button
              type="button"
              onClick={onSaveDraft}
              className="bg-pink-50 text-[#ec4899] border border-pink-200 rounded-full px-3 py-2 text-[11px] font-black flex items-center gap-1.5 active:scale-95 shadow-sm"
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
          className="absolute left-12 top-4 h-[2px] bg-[#ec4899] transition-all duration-300"
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
                ? 'bg-[#ec4899] text-white shadow-pink-900/30'
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
            className={`text-[10px] font-black leading-tight ${step === i + 1 ? 'text-[#ec4899]' : 'text-gray-400'
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

  const selectedSeason = draft.season || '2026-27';
  const selectedSeasonInfo = getSeasonInfo(selectedSeason);
  const currentSeasonSchedule = getSeasonSchedule(selectedSeason);

  const handleSeasonChange = (seasonKey) => {
    const seasonInfo = getSeasonInfo(seasonKey);

    updateDraft({
      season: seasonKey,
      tournament: seasonInfo.tournament,
      matchSection: '',
      date: '',
      opponent: '',
      stadium: '',
      venueType: 'HOME',
      seat: '',
      seatBlock: '',
      seatRow: '',
      seatNumber: '',
    });

    setTeamOpen(false);
  };

  const handleSelectMatch = (sectionValue) => {
    if (!sectionValue) {
      updateDraft({
        matchSection: '',
        date: '',
        opponent: '',
        stadium: '',
        seat: '',
        seatBlock: '',
        seatRow: '',
        seatNumber: '',
      });
      return;
    }

    const match = currentSeasonSchedule.find(
      (item) => String(item.section) === String(sectionValue)
    );

    if (!match) return;

    updateDraft({
      season: selectedSeason,
      matchSection: sectionValue,
      tournament: selectedSeasonInfo.tournament,
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

  const changeVenueType = (type) => {
    const currentTeam =
      opponentTeams.find((team) => team.name === draft.opponent) ||
      opponentTeams.find((team) => team.name === 'FC東京');

    updateDraft({
      venueType: type,
      stadium: type === 'HOME'
        ? 'YANMAR HANASAKA STADIUM'
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

        <button
          type="button"
          onClick={() => {
            updateDraft({
              isQuick: true,
              quickMemo: draft.quickMemo || '',
            });
            setView('quickRecord');
          }}
          className="w-full mb-5 bg-gradient-to-r from-[#831843] via-[#ec4899] to-[#92400e] text-white rounded-[1.5rem] p-4 border border-pink-200/20 shadow-xl shadow-pink-900/20 active:scale-[0.98]"
        >
          <div className="flex items-start gap-3">
            <div className="mt-0.5 w-6 h-6 rounded-lg border-2 border-white/70 flex items-center justify-center bg-white/10">
              ✓
            </div>

            <div className="text-left">
              <div className="text-sm font-black">
                クイック記録で入力する
              </div>
              <div className="text-xs text-white/75 font-bold leading-5 mt-1">
                結果だけ先に保存して、あとから写真・MVP・メモを追加できます。
              </div>
            </div>
          </div>
        </button>
        <InputBlock icon={<Calendar size={18} />} label="シーズン">
          <select
            value={draft.season || '2026-27'}
            onChange={(e) => handleSeasonChange(e.target.value)}
            className="field"
          >
            {seasonOptions.map((season) => (
              <option key={season.key} value={season.key}>
                {season.label}
              </option>
            ))}
          </select>
        </InputBlock>

        <p className="text-[11px] text-gray-500 font-bold -mt-2 pl-1 leading-tight">
          ※「節」を選択すると、試合日や対戦相手、スタジアムが自動で反映されます。
        </p>

        <InputBlock icon={<Flag size={18} />} label="節を選択">
          <select
            value={draft.matchSection || ''}
            onChange={(e) => handleSelectMatch(e.target.value)}
            className="field"
          >
            <option value="">選択してください</option>
            {currentSeasonSchedule.map((match) => (
              <option key={match.section} value={match.section}>
                第{match.section}節 {match.displayDate} vs {match.opponent}
              </option>
            ))}
          </select>
        </InputBlock>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <InputBlock icon={<Calendar size={18} />} label="試合日">
            <label className="relative flex items-center justify-between w-full max-w-full box-border border border-gray-200 rounded-2xl bg-white px-4 py-4 overflow-hidden">
              <span
                className={`font-black text-lg ${draft.date ? 'text-[#171425]' : 'text-gray-400'}`}
              >
                {draft.date ? draft.date.replaceAll('-', '/') : '日付を選択'}
              </span>

              <Calendar size={24} className="text-[#ec4899] shrink-0" />

              <input
                type="date"
                value={draft.date}
                onChange={(e) => updateDraft({ date: e.target.value })}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </label>
          </InputBlock>

          <InputBlock icon={<Trophy size={18} />} label="大会">
            <select
              value={draft.tournament || selectedSeasonInfo.tournament}
              onChange={(e) => updateDraft({ tournament: e.target.value })}
              className="field"
            >
              <option>明治安田J1リーグ</option>
              <option>ルヴァンカップ</option>
              <option>天皇杯</option>
            </select>
          </InputBlock>
        </div>

        <InputBlock icon={<Users size={18} />} label="対戦カード">
          <div className="border border-gray-200 rounded-2xl p-4 bg-white">
            <div className="flex items-center justify-between gap-3">

              {/* サンフレ側 */}
              <div className="flex-1 text-center">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-[#ec4899] text-white flex items-center justify-center shadow-md">
                  {/* ↓ strokeWidth={0} と className を右側に合わせる */}
                  <Shield size={30} fill="currentColor" strokeWidth={0} className="text-white" />
                </div>
                <div className="h-9 text-xs font-black mt-2 leading-snug flex items-center justify-center text-center">
                  セレッソ大阪
                </div>
              </div>

              <div className="px-2">
                <div className="w-10 h-10 rounded-full bg-[#f8f7fb] border border-gray-200 flex items-center justify-center font-black text-[#ec4899]">
                  VS
                </div>
              </div>

              {/* 相手側 */}
              <button
                type="button"
                onClick={() => setTeamOpen(!teamOpen)}
                className="flex-1 text-center interactive-card rounded-xl p-2 hover:bg-pink-50"
              >
                {selectedTeam ? (
                  <TeamBadge team={selectedTeam} />
                ) : (
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-gray-100 text-gray-400 flex items-center justify-center shadow-sm">
                    <Shield size={30} fill="currentColor" strokeWidth={0} />
                  </div>
                )}

                <div className="h-9 text-xs font-black mt-2 leading-snug flex items-center justify-center gap-1 text-center">
                  <span className="line-clamp-2">
                    {selectedTeam ? selectedTeam.name : '対戦相手を選択'}
                  </span>

                  <ChevronRight
                    size={14}
                    className="rotate-90 text-[#ec4899] shrink-0"
                  />
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
                            : 'YANMAR HANASAKA STADIUM',
                        });
                        setTeamOpen(false);
                      }}
                      className={`h-[58px] flex items-center gap-2 rounded-xl border px-2 py-2 text-left transition ${draft.opponent === team.name
                        ? 'border-[#ec4899] bg-pink-50'
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
                  ? 'bg-[#ec4899] text-white border-[#ec4899] shadow-lg shadow-pink-900/20'
                  : 'bg-white text-[#ec4899] border-gray-200 hover:bg-pink-50'
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
              className="w-24 h-16 border border-gray-200 rounded-xl text-center text-3xl font-black text-[#ec4899] flex items-center justify-center leading-none pt-1"
            />
            <span className="font-black">-</span>
            <input
              type="number"
              value={draft.awayScore}
              onChange={(e) => updateDraft({ awayScore: e.target.value })}
              className="w-24 h-16 border border-gray-200 rounded-xl text-center text-3xl font-black text-[#ec4899] flex items-center justify-center leading-none pt-1"
            />
          </div>
        </InputBlock>

        <InputBlock icon={<Building2 size={18} />} label="スタジアム">
          <div className="relative">
            <MapPin
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#ec4899] pointer-events-none z-10"
            />
            <select
              value={draft.stadium}
              onChange={(e) => updateDraft({ stadium: e.target.value })}
              className="field"
              style={{ paddingLeft: '52px' }}
            >
              <option>YANMAR HANASAKA STADIUM</option>
              <option>エディオンピースウイング広島</option>

              {/* 北から順 */}


              <option>水戸信用金庫スタジアム</option>
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
              <option>パロマ瑞穂スタジアム</option>
              <option>サンガスタジアム by KYOCERA</option>
              <option>パナソニック スタジアム 吹田</option>
              <option>ノエビアスタジアム神戸</option>
              <option>ベスト電器スタジアム</option>
              <option>JFE晴れの国スタジアム</option>
              <option>PEACE STADIUM Connected by SoftBank</option>

              {/* 予備・よく使う会場 */}
              <option>YANMAR HANASAKA STADIUM</option>

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

function QuickRecordView({ setView, draft, updateDraft, onSave, onSaveDraft }) {
  const selectedSeason = draft.season || '2026-27';
  const selectedSeasonInfo = getSeasonInfo(selectedSeason);
  const currentSeasonSchedule = getSeasonSchedule(selectedSeason);

  const canSave =
    draft.date &&
    draft.opponent &&
    draft.stadium &&
    draft.homeScore !== '' &&
    draft.awayScore !== '';

  const opponentTeam =
    opponentTeams.find((team) => team.name === draft.opponent) ||
    { name: '相手', short: '相手', main: '#64748b', sub: '#cbd5e1' };

  const handleSelectMatch = (sectionValue) => {
    if (!sectionValue) {
      updateDraft({
        matchSection: '',
        date: '',
        opponent: '',
        stadium: '',
        venueType: 'HOME',
      });
      return;
    }

    const match = currentSeasonSchedule.find(
      (item) => String(item.section) === String(sectionValue)
    );

    if (!match) return;

    updateDraft({
      isQuick: true,
      season: selectedSeason,
      matchSection: sectionValue,
      tournament: selectedSeasonInfo.tournament,
      date: match.date,
      opponent: match.opponent,
      stadium: match.stadium,
      venueType: match.venueType,
    });
  };

  const handleQuickSave = () => {
    if (!canSave) {
      alert('日付・対戦相手・スタジアム・スコアを入力してください');
      return;
    }

    updateDraft({
      isQuick: true,
      companion: '',
      memo: draft.memo || draft.quickMemo || '',
      tags: draft.tags?.length ? draft.tags : ['クイック記録'],
    });

    setTimeout(() => {
      onSave();
    }, 0);
  };

  const goDetailInput = () => {
    updateDraft({
      isQuick: false,
      companion: '',
      memo: draft.memo || draft.quickMemo || '',
    });
    setView('step1');
  };

  return (
    <CreateShell
      setView={setView}
      backTo="step1"
      step={1}
      onSaveDraft={onSaveDraft}
      hideStepIndicator={true}
    >
      <div className="space-y-5">
        <div className="bg-[#16051f] text-white rounded-[1.8rem] p-5 shadow-xl shadow-pink-900/20 border border-pink-200/10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-3 py-1 text-[11px] font-black text-pink-100">
            <Clock size={13} />
            QUICK RECORD
          </div>

          <h2 className="text-2xl font-black mt-4 leading-tight">
            結果だけ、先に残す。
          </h2>

          <p className="text-xs text-white/70 font-bold leading-6 mt-2">
            試合後すぐに最低限の記録だけ保存できます。
            写真・MVP・フォーメーションはあとから追記できます。
          </p>
        </div>

        <InputBlock icon={<Calendar size={18} />} label="シーズン">
          <select
            value={selectedSeason}
            onChange={(e) => {
              const seasonInfo = getSeasonInfo(e.target.value);
              updateDraft({
                season: e.target.value,
                tournament: seasonInfo.tournament,
                matchSection: '',
                date: '',
                opponent: '',
                stadium: '',
                venueType: 'HOME',
              });
            }}
            className="field"
          >
            {seasonOptions.map((season) => (
              <option key={season.key} value={season.key}>
                {season.label}
              </option>
            ))}
          </select>
        </InputBlock>

        <InputBlock icon={<Flag size={18} />} label="試合を選択">
          <select
            value={draft.matchSection || ''}
            onChange={(e) => handleSelectMatch(e.target.value)}
            className="field"
          >
            <option value="">選択してください</option>
            {currentSeasonSchedule.map((match) => (
              <option key={match.section} value={match.section}>
                第{match.section}節 {match.displayDate} vs {match.opponent}
              </option>
            ))}
          </select>
        </InputBlock>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <InputBlock icon={<Calendar size={18} />} label="日付">
            <input
              type="date"
              value={draft.date || ''}
              onChange={(e) => updateDraft({ date: e.target.value })}
              className="field quick-date-field"
            />
          </InputBlock>

          <InputBlock icon={<MapPin size={18} />} label="会場">
            <select
              value={draft.venueType || 'HOME'}
              onChange={(e) => updateDraft({ venueType: e.target.value })}
              className="field quick-date-field"
            >
              <option value="HOME">ホーム</option>
              <option value="AWAY">アウェイ</option>
            </select>
          </InputBlock>
        </div>

        <InputBlock icon={<Shield size={18} />} label="対戦相手">
          <select
            value={draft.opponent || ''}
            onChange={(e) => {
              const team = opponentTeams.find((item) => item.name === e.target.value);

              updateDraft({
                opponent: e.target.value,
                stadium:
                  draft.venueType === 'HOME'
                    ? cerezoTeam.stadium
                    : team?.stadium || draft.stadium,
              });
            }}
            className="field"
          >
            <option value="">選択してください</option>
            {opponentTeams.map((team) => (
              <option key={team.name} value={team.name}>
                {team.name}
              </option>
            ))}
          </select>
        </InputBlock>

        <InputBlock icon={<MapPin size={18} />} label="スタジアム">
          <input
            type="text"
            value={draft.stadium || ''}
            onChange={(e) => updateDraft({ stadium: e.target.value })}
            placeholder="例：YANMAR HANASAKA STADIUM"
            className="field"
          />
        </InputBlock>

        <div className="bg-white rounded-[1.6rem] p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 text-[#ec4899] font-black mb-4">
            <Trophy size={18} />
            試合結果
          </div>

          <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-end">
            <div className="text-center">
              <div className="mb-2 flex flex-col items-center">
                <TeamBadge team={cerezoTeam} size="small" />
                <div className="mt-1 text-[11px] font-black text-gray-600">
                  C大阪
                </div>
              </div>

              <input
                type="number"
                inputMode="numeric"
                value={draft.homeScore || ''}
                onChange={(e) => updateDraft({ homeScore: e.target.value })}
                className="field text-center text-2xl font-black"
                placeholder="0"
              />
            </div>

            <div className="pb-3 text-2xl font-black text-gray-400">
              -
            </div>

            <div className="text-center">
              <div className="mb-2 flex flex-col items-center">
                <TeamBadge team={opponentTeam} size="small" />
                <div className="mt-1 text-[11px] font-black text-gray-600 truncate max-w-[92px]">
                  {opponentTeam.short || '相手'}
                </div>
              </div>

              <input
                type="number"
                inputMode="numeric"
                value={draft.awayScore || ''}
                onChange={(e) => updateDraft({ awayScore: e.target.value })}
                className="field text-center text-2xl font-black"
                placeholder="0"
              />
            </div>
          </div>
        </div>

        <InputBlock icon={<PenSquare size={18} />} label="ひとことメモ">
          <textarea
            value={draft.quickMemo || ''}
            onChange={(e) =>
              updateDraft({
                quickMemo: e.target.value,
                memo: e.target.value,
              })
            }
            placeholder="例：後半ATのゴールで叫んだ。あとで詳しく書く。"
            className="field min-h-[92px] resize-none leading-6"
          />
        </InputBlock>
      </div>

      <BottomAction>
        <button
          type="button"
          onClick={() => setView('step1')}
          className="secondary-btn"
        >
          <ChevronLeft size={20} />
          戻る
        </button>

        <button
          type="button"
          onClick={goDetailInput}
          className="bg-white text-[#ec4899] border border-pink-200 rounded-2xl py-3 px-4 font-black flex items-center justify-center gap-2 active:scale-95"
        >
          詳しく入力
        </button>

        <button
          type="button"
          onClick={handleQuickSave}
          className={`primary-btn flex-[1.2] ${!canSave ? 'opacity-50' : ''}`}
        >
          保存
          <CheckCircle2 size={18} />
        </button>
      </BottomAction>

      <StyleHelper />
    </CreateShell>
  );
}

function CreateStep2({ setView, draft, updateDraft, records = [], onSaveDraft }) {
  const [tagInput, setTagInput] = useState('');

  const seasonPlayerOptions = getSeasonPlayerOptions(draft.season || '2026-27');

  const selectedMvp =
    seasonPlayerOptions.find((player) => player.name === draft.mvp) ||
    playerOptions.find((player) => player.name === draft.mvp) ||
    null;

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
          <div className="flex items-center gap-2 text-[#ec4899] font-black mb-4">
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

              <div className="text-[11px] text-[#ec4899] font-black mt-2 max-w-[120px] leading-snug">
                {draft.rating
                  ? ratingMessages[draft.rating]
                  : 'タップして満足度を選択'}
              </div>
            </div>
          </div>
        </Card>



        {/* 今日のMVP */}
        <Card>
          <div className="flex items-center gap-2 text-[#ec4899] font-black mb-4">
            <Trophy size={18} fill="currentColor" />
            今日のMVP
          </div>

          <div className="flex items-center gap-4">
            {selectedMvp ? (
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#ec4899] to-[#831843] text-white flex flex-col items-center justify-center shadow-md shrink-0">
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
                className="w-full border border-gray-200 rounded-xl p-3 font-black text-[#171425] outline-none focus:border-[#ec4899] focus:ring-4 focus:ring-pink-100 bg-white"
              >
                <option value="">選択してください</option>
                {seasonPlayerOptions.map((player) => (
                  <option key={player.name} value={player.name}>
                    #{player.number} {player.name} / {player.position}
                  </option>
                ))}
              </select>

              {selectedMvp ? (
                <>
                  <div className="mt-2 text-sm font-black text-[#ec4899]">
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
          <div className="flex items-center gap-2 text-[#ec4899] font-black mb-3">
            <PenSquare size={17} /> 思い出メモ
          </div>

          <textarea
            value={draft.memo}
            onChange={(e) => updateDraft({ memo: e.target.value })}
            className="w-full h-36 outline-none resize-none text-sm leading-relaxed border border-gray-200 rounded-2xl p-4 focus:border-[#ec4899] focus:ring-4 focus:ring-pink-100"
            placeholder="試合の感想、印象に残ったプレー、スタジアムの雰囲気など..."
          />

          <div className="text-right text-xs text-gray-400 font-bold mt-2">
            {draft.memo.length}/300
          </div>
        </Card>

        {/* タグ */}
        <Card>
          <div className="flex items-center gap-2 text-[#ec4899] font-black mb-4">
            <TagIcon size={18} />
            タグを追加
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            {(draft.tags || []).map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => removeTag(tag)}
                className="border border-[#ec4899] text-[#ec4899] rounded-full px-3 py-1.5 text-xs font-black"
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
              className="bg-[#ec4899] text-white px-4 rounded-2xl text-xs font-black"
            >
              追加
            </button>
          </div>
        </Card>

        {/* 写真 */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-[#ec4899] font-black">
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
              <label className="h-24 rounded-2xl border-2 border-dashed border-pink-200 bg-pink-50/50 text-[#ec4899] flex flex-col items-center justify-center font-black cursor-pointer hover:bg-pink-100 transition">
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
  const seasonPlayerOptions = getSeasonPlayerOptions(draft.season || '2026-27');

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
        <div className="flex items-center gap-2 text-[#ec4899] font-black">
          <Trophy size={18} />
          得点者
        </div>

        <button
          type="button"
          onClick={addScorer}
          className="text-xs font-black text-[#ec4899] bg-pink-50 border border-pink-100 px-3 py-2 rounded-full active:scale-95"
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
                <div className="w-8 h-8 rounded-xl bg-[#ec4899] text-white flex items-center justify-center text-xs font-black shrink-0">
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
                  {seasonPlayerOptions
                    .filter((player) => player.position !== 'GK')
                    .map((player) => (
                      <option key={player.name} value={player.name}>
                        {player.position} / #{player.number} {player.name}
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
  const seasonPlayerOptions = getSeasonPlayerOptions(draft.season || '2026-27');
  const isAwayUniform =
    draft.venueType === 'AWAY' || draft.venueType === 'アウェイ';

  const selectedUniformClass = isAwayUniform
    ? 'bg-white text-[#ec4899] border-pink-200 ring-2 ring-white/70'
    : 'bg-[#ec4899] text-white border-yellow-300';

  const activeUniformClass = isAwayUniform
    ? 'bg-white text-[#ec4899] border-yellow-300 ring-4 ring-yellow-200/70'
    : 'bg-yellow-300 text-[#ec4899] border-white ring-4 ring-yellow-200/60';

  const modalSelectedUniformClass = isAwayUniform
    ? 'bg-white text-[#ec4899] border border-pink-200'
    : 'bg-[#ec4899] text-white';
  const previousPositionRecord = records.find((record) => {
    const data = record.draftData || {};

    return (
      getRecordSeason(record) === (draft.season || '2026-27') &&
      data.formation &&
      data.lineup &&
      Object.keys(data.lineup).length > 0
    );
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

    const positionPriorityBySlot = {
      SHADOW1: ['FW', 'MF'],
      SHADOW2: ['FW', 'MF'],
    };

    const positionPriority =
      positionPriorityBySlot[slotKey] || allowedPositions;

    return seasonPlayerOptions
      .filter((player) => {
        const isAllowedPosition = allowedPositions.includes(player.position);

        const isSpecialDmfPlayer =
          (slotKey === 'DMF1' || slotKey === 'DMF2') &&
          player.name === '新井 直人';

        return isAllowedPosition || isSpecialDmfPlayer;
      })
      .sort((a, b) => {
        const aPriority = positionPriority.indexOf(a.position);
        const bPriority = positionPriority.indexOf(b.position);

        return aPriority - bPriority;
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
        <div className="flex items-center gap-2 text-[#ec4899] font-black">
          <Shirt size={18} />
          スタメンポジション
        </div>

        <select
          value={formation}
          onChange={(e) => changeFormation(e.target.value)}
          className="text-xs font-black text-[#ec4899] bg-pink-50 border border-pink-100 rounded-full px-3 py-2 outline-none"
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
          ? 'bg-pink-50 border-pink-100 text-[#ec4899]'
          : 'bg-gray-50 border-gray-100 text-gray-400'
          }`}
      >
        <div
          className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 ${isUsingPreviousPosition
            ? 'bg-[#ec4899] border-[#ec4899] text-white'
            : hasPreviousPosition
              ? 'bg-white border-[#ec4899] text-transparent'
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
          const player =
            seasonPlayerOptions.find((p) => p.name === playerName) ||
            playerOptions.find((p) => p.name === playerName);
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
                  ? activeUniformClass
                  : player
                    ? selectedUniformClass
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
                <div className="text-[11px] text-[#ec4899] font-black tracking-widest">
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
                      ? 'bg-pink-50 border-pink-200'
                      : 'bg-white border-gray-100'
                      }`}
                  >
                    <div
                      className={`w-11 h-11 rounded-2xl flex flex-col items-center justify-center ${selectedHere
                        ? modalSelectedUniformClass
                        : 'bg-[#f8f7fb] text-[#ec4899]'
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
                      <CheckCircle2 size={20} className="text-[#ec4899]" />
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
          <div className="flex items-center gap-2 text-[#ec4899] font-black mb-3">
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
                  <span className="text-[#ec4899]">{item.icon}</span>
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
                    className="w-24 text-right outline-none font-black text-[#ec4899] bg-pink-50 rounded-lg px-2 py-1 focus:ring-4 focus:ring-pink-100"
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

            <div className="text-3xl font-black text-[#ec4899] tracking-tight">
              ¥{total.toLocaleString()}
            </div>
          </div>
        </Card>

        {/* タイムライン */}
        <Card>
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2 text-[#ec4899] font-black">
              <Clock size={18} />
              タイムラインを入力
              <span className="text-xs text-gray-400">（任意）</span>
            </div>

            <button
              type="button"
              onClick={addTimeline}
              className="border border-[#ec4899] text-[#ec4899] rounded-full px-3 py-2 text-xs font-black flex items-center gap-1 hover:bg-pink-50"
            >
              <Plus size={15} />
              追加
            </button>
          </div>

          <p className="text-xs text-gray-500 font-bold mb-5">
            ペンで編集、ごみ箱で削除できます。項目を長押しして動かすと順番を入れ替えられます。
          </p>

          <div className="relative ml-3 border-l-2 border-[#ec4899] space-y-4">
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
                  <div className="absolute -left-[9px] top-4 w-4 h-4 rounded-full border-2 border-[#ec4899] bg-white"></div>

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
                          className="w-20 border border-gray-200 rounded-lg px-2 py-1 text-sm font-black outline-none focus:border-[#ec4899]"
                        />
                      ) : (
                        <div className="w-16 font-black text-[#ec4899]">
                          {item.time}
                        </div>
                      )}

                      {isEditing ? (
                        <input
                          type="text"
                          value={item.desc}
                          onChange={(e) => updateTimeline(item.id, { desc: e.target.value })}
                          className="flex-1 min-w-0 border border-gray-200 rounded-lg px-2 py-1 text-sm font-bold outline-none focus:border-[#ec4899]"
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
                        className="interactive-icon text-[#ec4899]"
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
  const isAwayUniform =
    draft.venueType === 'AWAY' || draft.venueType === 'アウェイ';

  const selectedUniformClass = isAwayUniform
    ? 'bg-white text-[#ec4899] border-pink-200 ring-2 ring-white/70'
    : 'bg-[#ec4899] text-white border-yellow-300';

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-[#ec4899] font-black">
          <Shirt size={18} />
          スタメンポジション
        </div>

        <div className="text-xs font-black text-[#ec4899] bg-pink-50 border border-pink-100 rounded-full px-3 py-1">
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
                  ? selectedUniformClass
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

  const hasCerezoGoal = Number(draft.homeScore || 0) > 0;

  return (
    <CreateShell setView={setView} backTo="step3" step={4} onSaveDraft={onSaveDraft}>
      <div className="space-y-4">
        {/* 試合結果メインカード */}
        <div className="relative overflow-hidden rounded-[1.6rem] bg-gradient-to-br from-[#831843] via-[#ec4899] to-[#d6b36a] text-white shadow-xl shadow-pink-900/25">
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

              <div className="bg-yellow-300 text-[#831843] text-xs font-black px-3 py-1.5 rounded-full shadow">
                {draft.homeScore > draft.awayScore ? 'WIN' : draft.homeScore === draft.awayScore ? 'DRAW' : 'LOSE'}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto flex items-center justify-center">
                    <TeamBadge team={cerezoTeam} size="small" />
                  </div>
                  <div className="text-xs font-black mt-2 whitespace-nowrap">
                    セレッソ大阪
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
        {hasCerezoGoal && (
          <Card>
            <div className="flex items-center gap-2 text-[#ec4899] font-black mb-4">
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
                      <div className="w-10 h-10 rounded-xl bg-[#ec4899] text-white flex items-center justify-center font-black">
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

                      <div className="text-lg font-black text-[#ec4899]">
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
        )}
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
              <div className="text-2xl font-black text-[#ec4899]">{draft.rating}.0</div>
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
              <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br from-[#ec4899] to-[#831843] text-white flex flex-col items-center justify-center shadow-md">
                <div className="text-[9px] font-black text-white/70">No.</div>
                <div className="text-xl font-black leading-none">{selectedMvp.number}</div>
              </div>
              <div className="text-[11px] font-black text-[#ec4899] mt-2 truncate">
                {selectedMvp.name}
              </div>
            </div>

            <div className="text-center">
              <div className="text-xs text-gray-500 font-black mb-2">合計費用</div>
              <div className="text-xl font-black text-[#ec4899] leading-tight">
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
          <div className="flex items-center gap-2 text-[#ec4899] font-black mb-3">
            <PenSquare size={17} />
            思い出メモ
          </div>
          <p className="text-sm leading-relaxed whitespace-pre-wrap text-[#171425]">
            {draft.memo || '未入力'}
          </p>
        </Card>

        {/* タグ */}
        <Card>
          <div className="flex items-center gap-2 text-[#ec4899] font-black mb-3">
            <TagIcon size={17} />
            タグ
          </div>

          <div className="flex flex-wrap gap-2">
            {draft.tags.length > 0 ? (
              draft.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-pink-100 text-[#ec4899] text-xs font-black px-3 py-1.5 rounded-full"
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
            <div className="flex items-center gap-2 text-[#ec4899] font-black">
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
          <div className="flex items-center gap-2 text-[#ec4899] font-black mb-3">
            <Wallet size={17} />
            金額の内訳
          </div>

          <ConfirmExpenseRow label="チケット代" value={draft.expenses.ticket} />
          <ConfirmExpenseRow label="グッズ代" value={draft.expenses.goods} />
          <ConfirmExpenseRow label="ご飯・飲み物代" value={draft.expenses.food} />
          <ConfirmExpenseRow label="交通費" value={draft.expenses.transport} />
          <ConfirmExpenseRow label="その他" value={draft.expenses.other} />

          <div className="border-t mt-3 pt-3 flex justify-between items-center">
            <div className="font-black text-[#ec4899]">合計</div>
            <div className="text-2xl font-black text-[#ec4899]">
              ¥{total.toLocaleString()}
            </div>
          </div>
        </Card>

        {/* タイムライン */}
        <Card>
          <div className="flex items-center gap-2 text-[#ec4899] font-black mb-4">
            <Clock size={17} />
            タイムライン
          </div>

          {draft.timeline.length > 0 ? (
            <div className="relative ml-3 border-l-2 border-[#ec4899] space-y-4">
              {draft.timeline.map((item) => (
                <div key={item.id} className="relative pl-6">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-[#ec4899] bg-white"></div>
                  <div className="bg-[#f8f7fb] rounded-2xl p-3 border border-gray-100">
                    <div className="text-xs font-black text-[#ec4899]">{item.time}</div>
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
      <div className="flex items-center gap-1 text-[#ec4899] text-xs font-black mb-1">
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
      <label className="flex items-center gap-2 text-[#ec4899] font-black mb-2">
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
        <span className="text-[#ec4899]">{icon}</span>
        {label}
      </div>
      <div className="font-black">¥ {value.toLocaleString()}</div>
    </div>
  );
}

function StyleHelper() {
  return (
    <style>{`
      .ticket-list-hint {
  margin: -2px 0 10px;
  text-align: center;
  color: rgba(255,255,255,0.38);
  font-size: 8px;
  font-weight: 900;
  letter-spacing: 0.14em;
}
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

      .quick-date-field {
        min-width: 0;
        height: 56px;
        font-size: 16px;
        line-height: 1.2;
        -webkit-appearance: none;
        appearance: none;
      }

      .quick-date-field::-webkit-date-and-time-value {
        text-align: left;
      }
      .field:focus {
        border-color: #ec4899;
        box-shadow: 0 0 0 3px rgba(75, 28, 137, 0.12);
      }
      .primary-btn {
        background: #ec4899;
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
        color: #ec4899;
        border: 1.5px solid #ec4899;
        border-radius: 999px;
        padding: 14px 18px;
        font-weight: 900;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 6px;
        flex: 1;
      }


      .ticket-tab-scroll::-webkit-scrollbar {
        display: none;
      }

      .ticket-tab-scroll {
        scrollbar-width: none;
      }

      .ticket-single {
  display: block;
  width: 100%;
  padding: 0;
  border: 0;
  background: transparent;
  text-align: left;
  cursor: pointer;
}

.ticket-single:active {
  transform: scale(0.995);
}

.ticket-front-single {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 104px 48px;
  min-height: 168px;
  border-radius: 22px;
  overflow: hidden;
  color: white;
  border: 1.5px solid color-mix(in srgb, var(--ticket-accent) 74%, white 26%);
  background: #1b093a;
  box-shadow: 0 18px 36px rgba(0, 0, 0, 0.34);
}

.ticket-front-single::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      90deg,
      color-mix(in srgb, var(--ticket-main) 72%, black 28%) 0%,
      rgba(35, 11, 73, 0.87) 41%,
      rgba(10, 3, 27, 0.70) 100%
    ),
    var(--ticket-img);
  background-size: cover;
  background-position: center;
  opacity: 0.98;
}

.ticket-front-single::after {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 16% 18%, rgba(255,255,255,0.16), transparent 18%),
    linear-gradient(120deg, rgba(255,255,255,0.08), transparent 34%, rgba(255,255,255,0.05) 100%);
  pointer-events: none;
}

.ticket-main-panel {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 88px 1fr;
  min-width: 0;
}

.ticket-left-icon {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: linear-gradient(180deg, rgba(255,255,255,0.08), rgba(17, 6, 43, 0.16));
  padding: 10px 8px 8px;
}

.stadium-mark {
  position: relative;
  width: 72px;
  height: 68px;
  display: grid;
  place-items: center;
  color: white;
  filter: drop-shadow(0 10px 18px rgba(0,0,0,0.28));
}

.stadium-svg {
  width: 70px;
  height: 70px;
  overflow: visible;
}

.badge-crown,
.badge-shield,
.badge-shield-inner,
.badge-stripe,
.badge-ball,
.badge-ball-lines,
.badge-wing,
.badge-spark {
  fill: none;
  stroke: url(#ticketBadgeStroke);
  stroke-linecap: round;
  stroke-linejoin: round;
}

.badge-crown {
  stroke-width: 2.8;
  fill: rgba(255,255,255,0.07);
}

.badge-shield {
  stroke-width: 4;
  fill: rgba(255,255,255,0.08);
}

.badge-shield-inner {
  stroke-width: 2.2;
  fill: url(#ticketBadgeFill);
}

.badge-stripe {
  stroke-width: 3;
  opacity: 0.85;
}

.badge-ball {
  stroke-width: 2.3;
  fill: rgba(255,255,255,0.10);
}

.badge-ball-lines {
  stroke-width: 1.5;
  opacity: 0.9;
}

.badge-wing {
  stroke-width: 2.2;
  opacity: 0.65;
}

.badge-spark {
  stroke: currentColor;
  stroke-width: 2;
  fill: rgba(255,255,255,0.16);
  opacity: 0.9;
}

.ticket-home-away {
  margin-top: 0;
  font-size: 9px;
  font-weight: 900;
  letter-spacing: 0.08em;
  color: rgba(255,255,255,0.7);
}

.ticket-info-panel {
  position: relative;
  padding: 15px 12px 11px;
  min-width: 0;
}

.ticket-meta-line {
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: 11px;
  font-weight: 900;
  color: rgba(255,255,255,0.72);
  white-space: nowrap;
}

.ticket-match-title {
  display: flex;
  align-items: baseline;
  gap: 9px;
  min-width: 0;
  margin-top: 7px;
  font-size: 25px;
  line-height: 1;
  font-weight: 950;
  letter-spacing: -0.04em;
  white-space: nowrap;
}

.ticket-match-title span {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ticket-match-title b {
  font-size: 15px;
  color: rgba(255,255,255,0.7);
  letter-spacing: 0;
}

.ticket-date-line {
  margin-top: 10px;
  font-size: 13px;
  font-weight: 900;
  color: rgba(255,255,255,0.92);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ticket-place-line {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 6px;
  font-size: 11px;
  font-weight: 800;
  color: rgba(255,255,255,0.75);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ticket-rare-chip {
  position: absolute;
  left: 12px;
  bottom: 12px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  max-width: 150px;
  border: 1px solid rgba(255,255,255,0.28);
  background: rgba(255,255,255,0.12);
  padding: 5px 10px;
  border-radius: 10px;
  color: white;
  font-size: 10px;
  font-weight: 900;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ticket-stub-panel {
  position: relative;
  z-index: 3;
  background: linear-gradient(180deg, #ffffff 0%, #f8f5ff 100%);
  color: #151123;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 12px 8px;
  border-left: 1.5px dashed rgba(75,28,137,0.35);
}

.ticket-stub-panel::before,
.ticket-stub-panel::after {
  content: "";
  position: absolute;
  left: -12px;
  width: 24px;
  height: 24px;
  border-radius: 999px;
  background: #08031d;
  z-index: 5;
}

.ticket-stub-panel::before { top: -12px; }
.ticket-stub-panel::after { bottom: -12px; }

.ticket-score-text {
  font-size: 25px;
  line-height: 1;
  font-weight: 950;
  letter-spacing: 0.02em;
}

.ticket-score-text span {
  color: #5b21b6;
}

.ticket-result-text {
  margin-top: 8px;
  color: #5b21b6;
  font-size: 13px;
  font-weight: 950;
}

.ticket-mom-label {
  margin-top: 8px;
  font-size: 10px;
  color: #171425;
  font-weight: 950;
}

.ticket-mom-name {
  max-width: 90px;
  margin-top: 2px;
  color: #171425;
  font-size: 12px;
  font-weight: 950;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ticket-stars {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  margin-top: 8px;
  color: #5b21b6;
}

.ticket-barcode-rail {
  position: relative;
  z-index: 4;
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--ticket-accent, #be185d) 88%, white 12%),
    color-mix(in srgb, var(--ticket-main, #ec4899) 78%, black 22%)
  );
  display: flex;
  align-items: center;
  justify-content: center;
}

.barcode-lines {
  width: 18px;
  height: 112px;
  background: repeating-linear-gradient(
    90deg,
    rgba(0,0,0,0.75) 0 2px,
    transparent 2px 4px,
    rgba(0,0,0,0.75) 4px 5px,
    transparent 5px 8px
  );
  opacity: 0.55;
}

.rail-text {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 130px;
  transform: translate(-50%, -50%) rotate(90deg);
  transform-origin: center;
  text-align: center;
  color: white;
  font-size: 8px;
  line-height: 1;
  font-weight: 950;
  letter-spacing: 0.08em;
  white-space: nowrap;
}

      .ticket-front::before {
        content: "";
        position: absolute;
        inset: 0;
        background:
          linear-gradient(90deg, color-mix(in srgb, var(--ticket-main) 70%, black 30%) 0%, rgba(35, 11, 73, 0.88) 42%, rgba(10, 3, 27, 0.68) 100%),
          var(--ticket-img);
        background-size: cover;
        background-position: center;
        opacity: 0.95;
      }

      .ticket-front::after {
        content: "";
        position: absolute;
        inset: 0;
        background:
          radial-gradient(circle at 16% 18%, rgba(255,255,255,0.16), transparent 18%),
          linear-gradient(120deg, rgba(255,255,255,0.08), transparent 34%, rgba(255,255,255,0.06) 100%);
        pointer-events: none;
      }

      .ticket-main-panel {
        position: relative;
        z-index: 2;
        display: grid;
        grid-template-columns: 88px 1fr;
        min-width: 0;
      }

      .ticket-left-icon {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-right: 1px solid rgba(255,255,255,0.12);
        background: linear-gradient(180deg, rgba(255,255,255,0.08), rgba(17, 6, 43, 0.16));
        padding: 10px 8px 8px;
      }

      .stadium-mark {
        position: relative;
        width: 68px;
        height: 62px;
        display: grid;
        place-items: center;
        color: white;
        filter: drop-shadow(0 8px 16px rgba(0,0,0,0.28));
      }

      .stadium-svg {
        width: 76px;
        height: 60px;
        overflow: visible;
      }

      .stadium-shell,
      .stadium-tier,
      .stadium-bowl,
      .stadium-pitch,
      .stadium-center-line,
      .stadium-center-circle,
      .stadium-light,
      .stadium-light-bar,
      .stadium-flag,
      .stadium-shadow,
      .stadium-away-spark {
        fill: none;
        stroke: url(#ticketStadiumStroke);
        stroke-linecap: round;
        stroke-linejoin: round;
      }

      .stadium-shell { stroke-width: 4.2; }
      .stadium-tier { stroke-width: 2.4; opacity: 0.9; }
      .stadium-bowl { stroke-width: 3.4; opacity: 0.96; }
      .stadium-pitch { stroke-width: 2.2; opacity: 0.82; }
      .stadium-center-line { stroke-width: 1.9; opacity: 0.8; }
      .stadium-center-circle { stroke-width: 1.7; opacity: 0.72; }
      .stadium-light { stroke-width: 2.5; opacity: 0.94; }
      .stadium-light-bar { stroke-width: 2.8; opacity: 0.85; }
      .stadium-flag { stroke-width: 2.1; fill: rgba(255,255,255,0.12); }
      .stadium-shadow { stroke: currentColor; stroke-width: 5.4; opacity: 0.18; }
      .stadium-away-spark { stroke: currentColor; stroke-width: 2.4; fill: rgba(255,255,255,0.18); opacity: 0.9; }

      .ticket-home-away {
        margin-top: 0;
        font-size: 9px;
        font-weight: 900;
        letter-spacing: 0.08em;
        color: rgba(255,255,255,0.7);
      }

      .ticket-info-panel {
        padding: 15px 12px 11px;
        min-width: 0;
      }

      .ticket-meta-line {
        display: flex;
        gap: 10px;
        align-items: center;
        font-size: 11px;
        font-weight: 900;
        color: rgba(255,255,255,0.72);
        white-space: nowrap;
      }

      .ticket-match-title {
        display: flex;
        align-items: baseline;
        gap: 9px;
        min-width: 0;
        margin-top: 7px;
        font-size: 25px;
        line-height: 1;
        font-weight: 950;
        letter-spacing: -0.04em;
        white-space: nowrap;
      }

      .ticket-match-title span {
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .ticket-match-title b {
        font-size: 15px;
        color: rgba(255,255,255,0.7);
        letter-spacing: 0;
      }

      .ticket-date-line {
        margin-top: 10px;
        font-size: 13px;
        font-weight: 900;
        color: rgba(255,255,255,0.92);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .ticket-place-line {
        display: flex;
        align-items: center;
        gap: 4px;
        margin-top: 6px;
        font-size: 11px;
        font-weight: 800;
        color: rgba(255,255,255,0.75);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .ticket-rare-chip {
        position: absolute;
        left: 100px;
        bottom: 12px;
        display: inline-flex;
        align-items: center;
        gap: 5px;
        max-width: 150px;
        border: 1px solid rgba(255,255,255,0.28);
        background: rgba(255,255,255,0.12);
        padding: 5px 10px;
        border-radius: 10px;
        color: white;
        font-size: 10px;
        font-weight: 900;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .ticket-stub-panel {
        position: relative;
        z-index: 3;
        background: linear-gradient(180deg, #ffffff 0%, #f8f5ff 100%);
        color: #151123;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 12px 8px;
        border-left: 1.5px dashed rgba(75,28,137,0.35);
      }

      .ticket-stub-panel::before,
      .ticket-stub-panel::after,
      .ticket-back::before,
      .ticket-back::after {
        content: "";
        position: absolute;
        left: -12px;
        width: 24px;
        height: 24px;
        border-radius: 999px;
        background: #08031d;
        z-index: 5;
      }

      .ticket-stub-panel::before,
      .ticket-back::before { top: -12px; }
      .ticket-stub-panel::after,
      .ticket-back::after { bottom: -12px; }

      .ticket-score-text {
        font-size: 25px;
        line-height: 1;
        font-weight: 950;
        letter-spacing: 0.02em;
      }

      .ticket-score-text span {
        color: #5b21b6;
      }

      .ticket-result-text {
        margin-top: 8px;
        color: #5b21b6;
        font-size: 13px;
        font-weight: 950;
      }

      .ticket-mom-label {
        margin-top: 8px;
        font-size: 10px;
        color: #171425;
        font-weight: 950;
      }

      .ticket-mom-name {
        max-width: 90px;
        margin-top: 2px;
        color: #171425;
        font-size: 12px;
        font-weight: 950;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .ticket-stars {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 2px;
        margin-top: 8px;
        color: #5b21b6;
      }

      .ticket-barcode-rail,
      .ticket-back-rail {
        position: relative;
        z-index: 4;
        background: linear-gradient(180deg, color-mix(in srgb, var(--ticket-accent, #be185d) 88%, white 12%), color-mix(in srgb, var(--ticket-main, #ec4899) 78%, black 22%));
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .barcode-lines {
        width: 18px;
        height: 112px;
        background: repeating-linear-gradient(90deg, rgba(0,0,0,0.75) 0 2px, transparent 2px 4px, rgba(0,0,0,0.75) 4px 5px, transparent 5px 8px);
        opacity: 0.55;
      }

      .rail-text {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 130px;
        transform: translate(-50%, -50%) rotate(90deg);
        transform-origin: center;
        text-align: center;
        color: white;
        font-size: 8px;
        line-height: 1;
        font-weight: 950;
        letter-spacing: 0.08em;
        white-space: nowrap;
      }

      .ticket-back {
        transform: rotateY(180deg) translateZ(1px);
        display: grid;
        grid-template-columns: 1fr 48px;
        background: linear-gradient(180deg, #ffffff 0%, #faf7ff 55%, #f5efff 100%);
        color: #171425;
        border: 1.5px solid #d8c9ff;
      }

      .ticket-back::after {
        box-shadow: inset 0 0 0 1px rgba(124,58,237,0.04);
      }

      .ticket-back-body {
        display: grid;
        grid-template-columns: minmax(94px, 0.95fr) minmax(132px, 1.25fr) minmax(84px, 0.82fr);
        gap: 10px;
        padding: 12px 12px 40px;
        min-width: 0;
        height: 100%;
      }

      .ticket-back-score,
      .ticket-back-info .info-mini {
        min-width: 0;
      }

      .ticket-back-score {
        display: flex;
        flex-direction: column;
        min-width: 0;
        padding-right: 2px;
      }

      .back-top-meta {
        min-width: 0;
      }

      .back-date {
        color: #5b21b6;
        font-size: 10px;
        font-weight: 950;
        letter-spacing: 0.04em;
        white-space: nowrap;
      }

      .back-meta {
        margin-top: 3px;
        color: #5b21b6;
        font-size: 9px;
        font-weight: 950;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .back-match {
        margin-top: 10px;
        display: flex;
        align-items: baseline;
        gap: 4px;
        color: #2a164f;
        font-size: 19px;
        line-height: 1.05;
        font-weight: 950;
        letter-spacing: -0.06em;
        white-space: nowrap;
        overflow: hidden;
      }

      .back-match span {
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .back-match b {
        color: #be185d;
        font-size: 12px;
        letter-spacing: 0;
        font-weight: 950;
        flex-shrink: 0;
      }

      .back-score {
        margin-top: 12px;
        color: #12091f;
        font-size: 28px;
        line-height: 1;
        font-weight: 950;
        letter-spacing: 0.02em;
        white-space: nowrap;
      }

      .back-score span {
        color: #5b21b6;
        font-size: 22px;
      }

      .back-score-list {
  margin-top: 8px;
  border-top: 1px solid #eee7ff;
  padding-top: 6px;
}


      .back-list-label {
        display: flex;
        align-items: center;
        gap: 4px;
        color: #5b21b6;
        font-size: 11px;
        font-weight: 950;
        letter-spacing: 0.02em;
      }

      .back-list-row {
  display: flex;
  gap: 5px;
  align-items: center;
  margin-top: 4px;
  font-size: 9px;
  line-height: 1.1;
  min-width: 0;
}

      .back-list-row span {
        color: #6d28d9;
        font-weight: 950;
        flex-shrink: 0;
      }

      .back-list-row b {
  color: #171425;
  font-weight: 900;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.back-list-row.is-more b {
  color: #5b21b6;
}

      .ticket-back-photo {
        position: relative;
        border-radius: 18px;
        overflow: hidden;
        box-shadow: 0 10px 22px rgba(75,28,137,0.14);
        min-width: 0;
        background: #efe8ff;
      }

      .ticket-back-photo {
  position: relative;
  height: 100%;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 10px 22px rgba(75,28,137,0.14);
  min-width: 0;
  background: #efe8ff;
}

.ticket-back-photo img {
  width: 100%;
  height: 100%;
  min-height: 0;
  object-fit: contain;
  display: block;
  background: #efe8ff;
}

      .ticket-photo-badge {
        position: absolute;
        left: 10px;
        top: 10px;
        padding: 4px 8px;
        border-radius: 999px;
        background: rgba(17, 6, 43, 0.62);
        color: white;
        font-size: 9px;
        font-weight: 950;
        letter-spacing: 0.08em;
        backdrop-filter: blur(6px);
      }

      .ticket-back-info {
        display: grid;
        gap: 10px;
        align-content: start;
        min-width: 0;
      }

      .info-mini {
        min-width: 0;
        display: flex;
        align-items: center;
        gap: 8px;
        border-radius: 14px;
        background: rgba(255,255,255,0.88);
        border: 1px solid #eee6ff;
        padding: 9px 9px;
        box-shadow: 0 8px 18px rgba(31, 12, 61, 0.05);
      }

      .ticket-back-footer {
        position: absolute;
        left: 12px;
        right: 60px;
        bottom: 0;
        height: 36px;
        display: grid;
        grid-template-columns: 1fr 122px;
        border-top: 1px solid #eee7ff;
        color: #171425;
        background: rgba(255,255,255,0.7);
        backdrop-filter: blur(4px);
      }

      .tap-back-line,
      .satisfaction-line {
        min-width: 0;
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 10px;
        font-weight: 900;
      }

      .tap-back-line {
        color: #6b5c8f;
        justify-content: center;
        font-size: 10px;
      }

      .satisfaction-line span {
        color: #5b21b6;
        font-size: 10px;
        font-weight: 950;
        flex-shrink: 0;
      }

      .satisfaction-line {
        justify-content: center;
        border-left: 1px solid #eee7ff;
      }

      .satisfaction-line .ticket-stars {
        margin-top: 0;
      }

      .ticket-back-rail {
        background: linear-gradient(180deg, #be185d, #ec4899);
      }

      @media (max-width: 430px) {
  .ticket-front-single {
    grid-template-columns: 1fr 92px 46px;
    min-height: 154px;
  }

  .ticket-main-panel {
    grid-template-columns: 76px 1fr;
  }

  .ticket-left-icon {
    padding: 9px 6px 7px;
  }

  .stadium-mark {
  width: 60px;
  height: 54px;
}

.stadium-svg {
  width: 68px;
  height: 52px;
}

  .ticket-info-panel {
    padding: 13px 10px 9px;
  }

  .ticket-meta-line {
    font-size: 10px;
    gap: 6px;
  }

  .ticket-match-title {
    font-size: 21px;
    gap: 6px;
  }

  .ticket-date-line {
    font-size: 11px;
  }

  .ticket-place-line {
    font-size: 9px;
  }

  .ticket-score-text {
    font-size: 22px;
  }

  .ticket-mom-name {
    font-size: 11px;
    max-width: 80px;
  }

  .ticket-stars svg {
    width: 13px;
    height: 13px;
  }

  .ticket-rare-chip {
    left: 10px;
    bottom: 10px;
    font-size: 8px;
    max-width: 122px;
  }

  .barcode-lines {
    height: 104px;
  }

  .rail-text {
    width: 120px;
    font-size: 7px;
  }
}
        .ticket-front { grid-template-columns: 1fr 92px 46px; }
        .ticket-main-panel { grid-template-columns: 76px 1fr; }
        .ticket-left-icon { padding: 9px 6px 7px; }
        .stadium-mark { width: 58px; height: 52px; }
        .stadium-svg { width: 64px; height: 50px; }
        .ticket-info-panel { padding: 13px 10px 9px; }
        .ticket-meta-line { font-size: 10px; gap: 6px; }
        .ticket-match-title { font-size: 21px; gap: 6px; }
        .ticket-date-line { font-size: 11px; }
        .ticket-place-line { font-size: 9px; }
        .ticket-score-text { font-size: 22px; }
        .ticket-mom-name { font-size: 11px; max-width: 80px; }
        .ticket-stars svg { width: 13px; height: 13px; }
        .ticket-rare-chip { left: 84px; bottom: 10px; font-size: 8px; max-width: 122px; }
        .barcode-lines { height: 104px; }
        .rail-text { width: 120px; font-size: 7px; }
        .ticket-back { grid-template-columns: 1fr 46px; }
        .ticket-back-body { grid-template-columns: minmax(74px, 0.9fr) minmax(98px, 1.18fr) minmax(70px, 0.78fr); gap: 6px; padding: 8px 8px 34px; }
        .back-date { font-size: 9px; }
        .back-meta { font-size: 7px; }
        .back-match { font-size: 15px; gap: 3px; }
        .back-match b { font-size: 10px; }
        .back-score { font-size: 22px; margin-top: 8px; }
        .back-score span { font-size: 17px; }
        .back-list-label { font-size: 8px; }
        .back-list-row {
  margin-top: 3px;
  gap: 4px;
  font-size: 7px;
  line-height: 1.05;
}
        .ticket-back-photo { border-radius: 14px; }
        .ticket-back-photo img {
  min-height: 0;
  height: 100%;
  object-fit: contain;
}
        .ticket-back-info { gap: 8px; }
        .info-mini { padding: 6px 5px; gap: 4px; border-radius: 10px; }
        .info-mini .text-\[11px\] { font-size: 8px; }
        .info-mini .text-\[12px\] { font-size: 9px; }
        .ticket-back-footer { left: 8px; right: 56px; height: 30px; grid-template-columns: 1fr 90px; }
        .tap-back-line, .satisfaction-line { gap: 4px; font-size: 8px; }
        .satisfaction-line span { font-size: 8px; }
      }


      /* ===== Ticket Collection Final Fix: front-only premium ticket ===== */
      .ticket-single {
        display: block !important;
        width: 100% !important;
        padding: 0 !important;
        margin: 0 !important;
        border: 0 !important;
        background: transparent !important;
        text-align: left !important;
        cursor: pointer !important;
      }

      .ticket-single:active {
        transform: scale(0.995);
      }

      .ticket-front-single {
        position: relative !important;
        display: grid !important;
        grid-template-columns: minmax(0, 1fr) 104px 48px !important;
        min-height: 168px !important;
        border-radius: 22px !important;
        overflow: hidden !important;
        color: white !important;
        background: #1b093a !important;
        border: 1.5px solid color-mix(in srgb, var(--ticket-accent) 74%, white 26%) !important;
        box-shadow: 0 18px 36px rgba(0, 0, 0, 0.34) !important;
      }

      .ticket-front-single::before {
        content: "" !important;
        position: absolute !important;
        inset: 0 !important;
        background:
          linear-gradient(
            90deg,
            color-mix(in srgb, var(--ticket-main) 74%, black 26%) 0%,
            rgba(35, 11, 73, 0.90) 42%,
            rgba(10, 3, 27, 0.70) 100%
          ),
          var(--ticket-img) !important;
        background-size: cover !important;
        background-position: center !important;
        opacity: 0.98 !important;
      }

      .ticket-front-single::after {
        content: "" !important;
        position: absolute !important;
        inset: 0 !important;
        background:
          radial-gradient(circle at 16% 18%, rgba(255,255,255,0.16), transparent 18%),
          linear-gradient(120deg, rgba(255,255,255,0.08), transparent 35%, rgba(255,255,255,0.05) 100%) !important;
        pointer-events: none !important;
      }

      .ticket-front-single .ticket-main-panel {
        position: relative !important;
        z-index: 2 !important;
        display: grid !important;
        grid-template-columns: 88px minmax(0, 1fr) !important;
        min-width: 0 !important;
      }

      .ticket-front-single .ticket-left-icon {
        position: relative !important;
        display: flex !important;
        flex-direction: column !important;
        justify-content: center !important;
        align-items: center !important;
        border-right: 1px solid rgba(255,255,255,0.13) !important;
        background: linear-gradient(180deg, rgba(255,255,255,0.08), rgba(17, 6, 43, 0.18)) !important;
        padding: 10px 8px 8px !important;
      }

      .ticket-front-single .stadium-mark {
        width: 68px !important;
        height: 62px !important;
        display: grid !important;
        place-items: center !important;
        color: white !important;
        filter: drop-shadow(0 8px 16px rgba(0,0,0,0.28)) !important;
      }

      .ticket-front-single .stadium-svg {
        width: 76px !important;
        height: 60px !important;
        overflow: visible !important;
      }

      .ticket-front-single .ticket-home-away {
        margin-top: 0 !important;
        font-size: 9px !important;
        font-weight: 900 !important;
        letter-spacing: 0.08em !important;
        color: rgba(255,255,255,0.72) !important;
      }

      .ticket-front-single .ticket-info-panel {
        position: relative !important;
        padding: 15px 12px 11px !important;
        min-width: 0 !important;
      }

      .ticket-front-single .ticket-meta-line {
        display: flex !important;
        gap: 10px !important;
        align-items: center !important;
        font-size: 11px !important;
        font-weight: 900 !important;
        color: rgba(255,255,255,0.74) !important;
        white-space: nowrap !important;
      }

      .ticket-front-single .ticket-match-title {
        display: flex !important;
        align-items: baseline !important;
        gap: 9px !important;
        min-width: 0 !important;
        margin-top: 7px !important;
        font-size: 25px !important;
        line-height: 1 !important;
        font-weight: 950 !important;
        letter-spacing: -0.04em !important;
        white-space: nowrap !important;
      }

      .ticket-front-single .ticket-match-title span {
        min-width: 0 !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
      }

      .ticket-front-single .ticket-match-title b {
        font-size: 15px !important;
        color: rgba(255,255,255,0.72) !important;
        letter-spacing: 0 !important;
      }

      .ticket-front-single .ticket-date-line {
        margin-top: 10px !important;
        font-size: 13px !important;
        font-weight: 900 !important;
        color: rgba(255,255,255,0.93) !important;
        white-space: nowrap !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
      }

      .ticket-front-single .ticket-place-line {
        display: flex !important;
        align-items: center !important;
        gap: 4px !important;
        margin-top: 6px !important;
        font-size: 11px !important;
        font-weight: 800 !important;
        color: rgba(255,255,255,0.78) !important;
        white-space: nowrap !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
      }

      .ticket-front-single .ticket-place-line span {
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        white-space: nowrap !important;
      }

      .ticket-front-single .ticket-rare-chip {
        position: absolute !important;
        left: 12px !important;
        bottom: 12px !important;
        display: inline-flex !important;
        align-items: center !important;
        gap: 5px !important;
        max-width: 150px !important;
        border: 1px solid rgba(255,255,255,0.28) !important;
        background: rgba(255,255,255,0.12) !important;
        padding: 5px 10px !important;
        border-radius: 10px !important;
        color: white !important;
        font-size: 10px !important;
        font-weight: 900 !important;
        white-space: nowrap !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
      }

      .ticket-front-single .ticket-stub-panel {
        position: relative !important;
        z-index: 3 !important;
        background: linear-gradient(180deg, #ffffff 0%, #f8f5ff 100%) !important;
        color: #151123 !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        justify-content: center !important;
        text-align: center !important;
        padding: 12px 8px !important;
        border-left: 1.5px dashed rgba(75,28,137,0.35) !important;
      }

      .ticket-front-single .ticket-stub-panel::before,
      .ticket-front-single .ticket-stub-panel::after {
        content: "" !important;
        position: absolute !important;
        left: -12px !important;
        width: 24px !important;
        height: 24px !important;
        border-radius: 999px !important;
        background: #08031d !important;
        z-index: 5 !important;
      }

      .ticket-front-single .ticket-stub-panel::before { top: -12px !important; }
      .ticket-front-single .ticket-stub-panel::after { bottom: -12px !important; }

      .ticket-front-single .ticket-score-text {
        font-size: 25px !important;
        line-height: 1 !important;
        font-weight: 950 !important;
        letter-spacing: 0.02em !important;
      }

      .ticket-front-single .ticket-score-text span {
        color: #5b21b6 !important;
      }

      .ticket-front-single .ticket-result-text {
        margin-top: 8px !important;
        color: #5b21b6 !important;
        font-size: 13px !important;
        font-weight: 950 !important;
      }

      .ticket-front-single .ticket-mom-label {
        margin-top: 8px !important;
        font-size: 10px !important;
        color: #171425 !important;
        font-weight: 950 !important;
      }

      .ticket-front-single .ticket-mom-name {
        max-width: 90px !important;
        margin-top: 2px !important;
        color: #171425 !important;
        font-size: 12px !important;
        font-weight: 950 !important;
        white-space: nowrap !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
      }

      .ticket-front-single .ticket-stars {
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        gap: 2px !important;
        margin-top: 8px !important;
        color: #5b21b6 !important;
      }

      .ticket-front-single .ticket-barcode-rail {
        position: relative !important;
        z-index: 4 !important;
        background: linear-gradient(
          180deg,
          color-mix(in srgb, var(--ticket-accent, #be185d) 88%, white 12%),
          color-mix(in srgb, var(--ticket-main, #ec4899) 78%, black 22%)
        ) !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
      }

      .ticket-front-single .barcode-lines {
        width: 18px !important;
        height: 112px !important;
        background: repeating-linear-gradient(
          90deg,
          rgba(0,0,0,0.75) 0 2px,
          transparent 2px 4px,
          rgba(0,0,0,0.75) 4px 5px,
          transparent 5px 8px
        ) !important;
        opacity: 0.55 !important;
      }

      .ticket-front-single .rail-text {
        position: absolute !important;
        left: 50% !important;
        top: 50% !important;
        width: 130px !important;
        transform: translate(-50%, -50%) rotate(90deg) !important;
        transform-origin: center !important;
        text-align: center !important;
        color: white !important;
        font-size: 8px !important;
        line-height: 1 !important;
        font-weight: 950 !important;
        letter-spacing: 0.08em !important;
        white-space: nowrap !important;
      }

      @media (max-width: 430px) {
        .ticket-front-single {
          grid-template-columns: minmax(0, 1fr) 92px 46px !important;
          min-height: 154px !important;
        }

        .ticket-front-single .ticket-main-panel {
          grid-template-columns: 76px minmax(0, 1fr) !important;
        }

        .ticket-front-single .ticket-left-icon {
          padding: 9px 6px 7px !important;
        }

        .ticket-front-single .stadium-mark {
          width: 58px !important;
          height: 52px !important;
        }

        .ticket-front-single .stadium-svg {
          width: 64px !important;
          height: 50px !important;
        }

        .ticket-front-single .ticket-info-panel {
          padding: 13px 10px 9px !important;
        }

        .ticket-front-single .ticket-meta-line {
          font-size: 10px !important;
          gap: 6px !important;
        }

        .ticket-front-single .ticket-match-title {
          font-size: 21px !important;
          gap: 6px !important;
        }

        .ticket-front-single .ticket-date-line {
          font-size: 11px !important;
        }

        .ticket-front-single .ticket-place-line {
          font-size: 9px !important;
        }

        .ticket-front-single .ticket-score-text {
          font-size: 22px !important;
        }

        .ticket-front-single .ticket-mom-name {
          font-size: 11px !important;
          max-width: 80px !important;
        }

        .ticket-front-single .ticket-stars svg {
          width: 13px !important;
          height: 13px !important;
        }

        .ticket-front-single .ticket-rare-chip {
          left: 10px !important;
          bottom: 10px !important;
          font-size: 8px !important;
          max-width: 122px !important;
        }

        .ticket-front-single .barcode-lines {
          height: 104px !important;
        }

        .ticket-front-single .rail-text {
          width: 120px !important;
          font-size: 7px !important;
        }
      }

      }
    `}</style>
  );
}