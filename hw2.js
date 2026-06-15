// 確保網頁元素都載入完成後才執行程式碼
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('cards-container');
    
    // 使用迴圈產生 6 張卡片
    for (let cardIndex = 0; cardIndex < 6; cardIndex++) {
        // 每張卡片的左上角基準值 (1, 2, 4, 8, 16, 32)
        const baseNumber = Math.pow(2, cardIndex); 
        
        // 建立卡片的外框 div
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        
        // 建立卡片標題
        const title = document.createElement('h3');
        title.innerText = `第 ${cardIndex + 1} 張卡片`;
        cardDiv.appendChild(title);
        
        // 建立勾選框 (Checkbox)
        const label = document.createElement('label');
        label.className = 'checkbox-label';
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'magic-checkbox';
        checkbox.value = baseNumber; // 將基準值存入 value，方便後續計算
        
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(' 數字在這一張'));
        cardDiv.appendChild(label);
        
        // 建立用來裝數字的網格區塊
        const gridDiv = document.createElement('div');
        gridDiv.className = 'number-grid';
        
        // 核心邏輯：利用位元運算 (Bitwise AND) 判斷 1~63 哪些數字屬於這張卡片
        for (let num = 1; num <= 63; num++) {
            if ((num & baseNumber) !== 0) {
                const numSpan = document.createElement('span');
                numSpan.innerText = num;
                gridDiv.appendChild(numSpan);
            }
        }
        cardDiv.appendChild(gridDiv);
        
        // 將組裝好的卡片加到畫面上
        container.appendChild(cardDiv);
    }

    // --- 計算邏輯 ---
    const calcBtn = document.getElementById('calculate-btn');
    const resultDisplay = document.getElementById('result-display');

    calcBtn.addEventListener('click', function() {
        let magicNumber = 0;
        
        // 找出所有被勾選 (checked) 的 checkbox
        const checkedBoxes = document.querySelectorAll('.magic-checkbox:checked');
        
        // 將打勾卡片的代表數值加總起來
        checkedBoxes.forEach(function(box) {
            magicNumber += parseInt(box.value);
        });
        
        // 顯示結果
        if (magicNumber === 0) {
            resultDisplay.innerText = "你還沒有勾選任何卡片喔！";
        } else {
            resultDisplay.innerText = "答案是：" + magicNumber;
        }
    });
});