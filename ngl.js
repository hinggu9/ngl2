const axios = require('axios');

const instagram = ""; // NGL 아이디
const message = ""; // 질문
const device = "";

const submitRequest = async (index) => {
    try {
        const response = await axios.post('https://ngl.link/api/submit', {
            username: instagram,
            question: message,
            deviceId: `${device}-${index}` // 각 요청별로 deviceId를 구분하기 위해 인덱스 추가
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'X-Requested-With': 'XMLHttpRequest'
            }
        });
        console.log('\x1b[32m', `[ NGL ] Submit을 Post 시도했어요! (${index})`, '\x1b[0m');
        console.log('\x1b[33m', `[ NGL value ] ${response.status}`, '\x1b[0m');
    } catch (error) {
        console.error(`Error submitting request (${index}):`, error.message);
    }
};

const submitInBatches = async (totalRequests, batchSize) => {
    const batches = Math.ceil(totalRequests / batchSize);
    for (let i = 0; i < batches; i++) {
        const batchStart = i * batchSize;
        const batchEnd = Math.min(totalRequests, (i + 1) * batchSize);
        
        const batchPromises = [];
        for (let j = batchStart; j < batchEnd; j++) {
            batchPromises.push(submitRequest(j));
        }
        
        await Promise.all(batchPromises);
    }
};

const totalRequests = 100; // 총 보낼 요청 수
const batchSize = 10; // 한 번에 보낼 요청의 개수
submitInBatches(totalRequests, batchSize);
