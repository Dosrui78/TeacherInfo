const XLSX = require('node-xlsx')
const puppeteer = require('puppeteer')
const mysql = require('mysql')
<<<<<<< HEAD
var schoolName = '重庆文理学院'
=======
var schoolName = '重庆第二师范学院'
>>>>>>> 514ff32 (更换成xpath解析)
var excelFilePath = `./${schoolName}.xlsx`


const browser = puppeteer.launch({
    headless: false,
    defaultView: null,
    args: [
        '--disable-gpu', // GPU硬件加速
        '--disable-dev-shm-usage', // 创建临时文件共享内存
        '--disable-setuid-sandbox', // uid沙盒
        '--no-first-run', // 没有设置首页。在启动的时候，就会打开一个空白页面
        '--no-zygote',
        '--single-process', // 单进程运行
        '--blink-settings=imagesEnabled=false', // 不加载图片
        '--disable-accelerated-2d-canvas', // canvas渲染
        '--window-size=1920x1080',
    ]
})


var conn = mysql.createConnection({
<<<<<<< HEAD
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'teacher'
    })
=======
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'teacher'
})
>>>>>>> 514ff32 (更换成xpath解析)
conn.connect()

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function saveData(schoolName, academy, name, title, faculty, direction, curl) {
<<<<<<< HEAD

=======
>>>>>>> 514ff32 (更换成xpath解析)
    // conn.connect(function (err){if(err){
    //     console.error('error connecting: ' + err.stack);
    //     return;
    // }})

    // console.log('connected as id ' + conn.threadID)

    let sql = `INSERT INTO teacher(school, faculty, name, title, subject, curriculum, introduction)
               values ('${schoolName}', '${academy}', '${name}', '${title}', '${faculty}', '${direction}', '${curl}')`
    conn.query(sql)

}

<<<<<<< HEAD


async function getTexts(sel, page) {
    zz = await page.$$eval(sel, el => el.map(el => el.innerText))
    return zz
}

async function getText(sel, page) {
    zz = await page.$eval(sel, el => el.textContent)
    return zz
}

async function href(sel, page){
    zz = await page.$$eval(sel, el => el.map(el => el.href))
    return zz
=======
async function getText(zz) {
    /* Xpath解析 */

    // let temp = await page.$$eval(s3, el => el.map(el => el.textContent)); //姓名
    let zzz = await Promise.all(zz.map(handle => handle.getProperty('textContent')));
    let zzzz = await Promise.all(zzz.map(handle => handle.jsonValue()))
    return zzzz
}


async function getHref(sel) {
    const zz = await Promise.all(sel.map(handle => handle.getProperty('href')));
    zzz = await Promise.all(zz.map(handle => handle.jsonValue()));
    return zzz
>>>>>>> 514ff32 (更换成xpath解析)
}

function unique(arr) {
    return Array.from(new Set(arr))
}

async function judgeUrl(s) {
    /* url去重以及判断抓取字段是否有遍历 */
<<<<<<< HEAD
    if (s[2] !== 1) {
        s[4] = s[2] + s[4];
        s[5] = s[2] + s[5];
        s[6] = s[2] + s[6];
    }
=======

>>>>>>> 514ff32 (更换成xpath解析)
    let arr = []
    for (const b of s[1].split('\n')) {
        arr.push(b.replace('\r', ''));
    }  //去除回车
    arr = unique(arr); // 对url去重
    return arr
}

async function judgeUrl1(s, page, url) {
    /*判断url是否能正常访问*/
<<<<<<< HEAD
    let x = await getTexts(s, page)
    if (x.length === 0 || x === '') {
        console.error(`Error: url is not right! ${url}`)
    }
}

async function one(content, i) {
    if (content.length === 1) {
        content = content[0]
        if(content === undefined || content === null){content = "";} //避免储存的值为null
    }else {content = content[i];
    if(content === undefined || content === null){content = "";}}
    return content
}


async function judgeSel(content, page){
    // console.log((await getTexts(content, page)))
    if(content && (await getTexts(content, page)).length === 0)
{
        console.log(`Error: Selector is wrong!! ${content}`)
    }
}

async function getData(s, page) {
    /* 解析，获取数据 */
    let temp = []
    var academy = s[0];
    var name, title, subject, direction, curl = [];
    names = await getTexts(s[3], page);
    titles = await getTexts(s[4], page);
    subjects = await getTexts(s[5], page);
    directions = await getTexts(s[6], page);
    curls = await href(s[3], page);
    temp.push(s[3], s[4], s[5], s[6])
    for(const t of temp){
        await judgeSel(t, page);
    }
    for (let i = 0; i < names.length; i++) {
        name = names[i];
        title = await one(titles, i);
        subject = await one(subjects, i);
        direction = await one(directions, i);
        curl = await one(curls, i);
        console.log(name, title, subject, direction, curl);
        await saveData(schoolName, academy, name, title, subject, direction, curl)
    }
=======
    let tm = await page.$eval('body', el => el.innerText)
    if (tm.indexOf('Not Found') !== -1 || tm.indexOf('您访问的页面未找到， 5秒后自动跳转到首页') !== -1) {
        console.log(`Error: Url is wrong! ${url}`);
        return -1
    }
}

async function judgeUrl2(s, b) {
    /* 判断xpath语句是否出错 */
    for (let x = 2; x < 6; x++) {
        if (s[x] && b.length === 0) {
            console.log(`Error: Xpath written error ${s[x]}`)
        }
    }
}


async function zero(content) {
    /* 格式化数据并对获取到的undefined数据进行转换 */
    if (content !== undefined && content !== null) {
        return content.trim()
    } else {
        return ""
    }
}

async function getData(s, page, count) {
    var titles = [];
    var subjects = [];
    var directions = [];
    var curls = [];
    var academy = s[0];
    let temp = await page.$x(s[2]);
    names = await getText(temp)
    curls = await getHref(temp)
    for (const t of temp) {
        for (let x = 3; x < 6; ++x) {
            let tt = await t.$x(s[x])
            let ttt = await getText(tt)
            if (x === 3) {
                titles.push(ttt);
            }
            if (x === 4) {
                subjects.push(ttt);
            }
            if (x === 5) {
                directions.push(ttt);
            }
        }
        count++;
    }
    await judgeUrl2(s, names);
    await judgeUrl2(s, titles);
    await judgeUrl2(s, subjects);
    await judgeUrl2(s, directions)

    for (var i = 0; i < names.length; i++) {
        name = await zero(names[i]);
        curl = await zero(curls[i]);
        title = await zero(titles[i][0]);
        subject = await zero(subjects[i][0]);
        direction = await zero(directions[i][0]);
        console.log(schoolName, academy, name, title, subject, direction, curl)
        // await saveData(schoolName, academy, name, title, subject, direction, curl)
    }
    return count
>>>>>>> 514ff32 (更换成xpath解析)
}

/* s[0]是学院名称；s[1]是学院链接；s[2]作为判断是否每个人的其他信息都是单独列出来的依据；
 * s[3]为教师名称；s[4]为职称；s[5]为院系信息；s[6]为授课专业或研究方向；s[7]如有则填上教
 * 师详情页。
 *  */
(async () => {
<<<<<<< HEAD
=======
    let count = 0;
>>>>>>> 514ff32 (更换成xpath解析)
    const page = await (await browser).newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3419.0 Safari/537.36');
    const sheets = XLSX.parse(excelFilePath) //解析excel，获取到所有sheets
    const sheet = sheets[0] //获取表格第一页内容
    for (const s of sheet.data) {
        const arr = await judgeUrl(s)
        for (const a of arr) {
<<<<<<< HEAD
            // console.log(a)
            await page.goto(a, {waitUntil: 'networkidle2'}).catch(async e => console.log(e));
            await judgeUrl1(s[3], page, a);
            await getData(s, page);
            await sleep(600);
        }
    }
=======
            await page.goto(a, {waitUntil: 'networkidle2'}).catch(async e => console.log(e));
            const bool = await judgeUrl1(s[3], page, a);  //检测url
            if (bool !== -1) {
                count = await getData(s, page, count);
                await sleep(600);
            }
        }
    }
    console.log(`共抓到${count}条数据`)
>>>>>>> 514ff32 (更换成xpath解析)
    // await (await browser).close();
})()



<<<<<<< HEAD


=======
>>>>>>> 514ff32 (更换成xpath解析)
