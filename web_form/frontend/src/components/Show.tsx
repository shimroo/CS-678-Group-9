import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuth';


const Show: React.FC = () => {
  const [displayText, setDisplayText] = useState<string>('Hello, World!');

  const handleButtonClick = () => {
    alert(displayText);
  };

  return (
    <body>
        <Navbar />
        <div className="container">
            <div className="show-box">
                1. آپ کس حد تک اس بیان سے متفق ہیں یا اختلاف رکھتے ہیں: 'پاکستان کو اپنی تعلیمی اور صحت کے شعبوں کو بہتر فنڈ دینے کے لیے اپنے فوجی اخراجات کو کم کرنا چاہیے؟
2. آپ کس حد تک اس بیان سے متفق ہیں یا اختلاف رکھتے ہیں: 'سرکاری اسکولوں کو ثقافتی ورثے کے تحفظ کے لیے مقامی زبانوں کو تعلیم کا وسیلہ بنانا چاہیے؟
3. آپ کس حد تک اس بیان سے متفق ہیں یا اختلاف رکھتے ہیں: 'حکومت کو تیل، گیس، پیٹرول، اور بجلی جیسی بنیادی سہولیات کی قیمتوں کو منظم کرنا چاہیے تاکہ انہیں عام عوام کے لیے زیادہ سستا بنایا جا سکے؟
4. آپ کس حد تک اس بیان سے متفق ہیں یا اختلاف رکھتے ہیں: 'پاکستان کو علاقائی استحکام اور معاشی ترقی کو فروغ دینے کے لیے بھارت کے ساتھ سفارتی، ثقافتی، اور معاشی تعلقات کو بہتر بنانے کی کوششوں کو ترجیح دینی چاہیے؟
5. آپ کس حد تک اس بیان سے متفق ہیں…
            </div>
            <button onClick={handleButtonClick}>Display Text</button>
        </div>
    </body>
  );
};

export default Show;
