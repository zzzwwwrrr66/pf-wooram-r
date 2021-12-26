import React, { useState, useReducer, useEffect, memo } from "react";
import { connect } from 'react-redux';
import _ from 'lodash';

import './css/ProjectSummary.css';

import Dialog from '@mui/material/Dialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';


const ProjectSummaryDialog = ({state, dispatch }) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div style={{display:'flex', justifyContent: 'flex-end'}}>
        <span className="link" onClick={()=> handleClickOpen()}>プロジェクト一覧</span>
      </div>
      <Dialog
      maxWidth='md'
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className='sp-margin0'
      >
        <div className='project-summary-dialog-wrap' >
          <h3># 2019</h3>
          <ul className="nes-list is-disc" style={{margin:'0 1rem 10px'}}>
            <li>11.01~ 【ホール】CMG2021 日本語版　コーディング 検証 </li>
          </ul>
          <h3># 2020</h3>
          <ul className="nes-list is-disc" style={{margin:'0 1rem 10px'}}>
            <li>11.01~ 【ホール】CMG2021 日本語版　コーディング 検証 </li>
            <li>【サントリーホール様】CMG2020 日本語版制作スケジュール (1ページ参加) </li>
            <li>docomo(mydaiz_新感覚ナビキャンペーン) </li>
            <li>docomo(金ビジ フィナンシャルプランナー紹介サービスページ) (未公開) </li>
            <li>docomo d払い(ローソン d払い+20%還元キャンペーン（d払い配下LP） </li>
            <li>docomo d払い(eKYCヘルプサイト新規制作) </li>
            <li>SST(CMG（チェンバーミュージック・ガーデン）2020年英語版　ページ修正) </li>
            <li>SST(【マスターズドリーム】山崎原酒樽熟成ブレンドページ改修) </li>
            <li>セブン銀行ローンページ改修（3ページの中1ページ参加） </li>
            <li>【日本健康管理協会】新宿健診プラザ　一部改修 </li>
            <li>【KBI】調理機器カタログ対応（2020秋）_調理機器 </li>
            <li>docomo d払いサイト 運用 </li>
            <li>duskin 店舗ページ量産 </li>
            <li>【SPS】イントラサイト改修およびエクストラサイト制作 </li>
            <li>d払い請求書払い開始LP作成 </li>
            <li>d払いLP・バナー制作 おトクなクーポン配信スタート！ LP </li>
            <li>docomo d払い デビュー＆おかえりキャンペーン </li>
            <li>docomo d払い クーポンキャンペーン  </li>
            <li>【SPS】イントラサイト改修およびエクストラサイト制作 </li>
            <li>docomo d払い リニューアル つかえるお店ページ  </li>
          </ul>
          <h3 style={{marginBottom:'0'}}># 2021</h3>
          <ul className="nes-list is-disc" style={{margin:'0 1rem 10px'}}>
          <li>docomo とくトクd払い20％還元CP  </li>
            <li>d払い 請求書リクエスト　受付フォーム (未公開)  </li>
            <li>docomo 全日食CP  </li>
            <li>duskin SYNERGY & 応募ページ  </li>
            <li>docomo d払い キャンペーン一覧ページ改修  </li>
            <li>docomo d払い 終了キャンペーン一覧ページ改修  </li>
            <li>docomo d払い つかえるお店ページ 事象改善  </li>
            <li>docomo dポイント山分けCP  </li>
            <li>docomo d払いをはじめよう！＋50％還元キャンペーン  </li>
            <li>docomo dフォト_注文キャンペーン_コーディング  </li>
            <li>sst 「プリンツ ベア」ブランドサイトRN  </li>
            <li>【ピジョン株式会社】詳細ページのテンプレート改修　 </li>
            <li>【ピジョン株式会社】商品一覧のテンプレート改修　 </li>
            <li>【GROWING】SP版のフォント拡大対応　 </li>
            <li>【スポ振】セゾンページ制作 </li>
            <li>HOYA 7月CP(半額 & 30%OFF) </li>
            <li>ライオン株式会社／スマイル　新商品追加に関わるサイト改修 </li>
            <li>ANAオリジナル おせち特集2022CP </li>
            <li>【ワコール】8/5公開「Teen」2ページ </li>
            <li>【ワコール】インスタライブpage　更新</li>
            <li>SST 【サントリーホール】WFH2021</li>
            <li>社内（トランス・コスモス）コーディングレベルLv4獲得（Lv5が最上位）</li>
            <li>社内新人研修（コーディング）フィードバック担当</li>
            <li>TOYOTA ファイナンス・旅行サイト</li>
            <li>MOS社会貢献活動コーディング</li>
          </ul>


          <CloseIcon fontSize='large' style={{cursor: 'pointer', position: 'absolute', top:'10px', right: '10px'}} onClick={handleClose}/>
        </div>
      </Dialog>
    </>
  );
};

function mapStateToProps(state){
  return {state};
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (memo(ProjectSummaryDialog));