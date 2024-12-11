import requests
from bs4 import BeautifulSoup
import time

def crawl_saramin(keyword, pages=1):
    """
    사람인 채용 공고를 크롤링합니다.
    """
    jobs = []
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }

    for page in range(1, pages + 1):
        url = f"https://www.saramin.co.kr/zf_user/search/recruit?searchType=search&searchword={keyword}&recruitPage={page}"

        try:
            response = requests.get(url, headers=headers)
            response.raise_for_status()
            soup = BeautifulSoup(response.text, 'html.parser')

            job_listings = soup.select('.item_recruit')

            for job in job_listings:
                try:
                    company = job.select_one('.corp_name a').text.strip()
                    title = job.select_one('.job_tit a').text.strip()
                    link = 'https://www.saramin.co.kr' + job.select_one('.job_tit a')['href']

                    conditions = job.select('.job_condition span')
                    location = conditions[0].text.strip() if len(conditions) > 0 else ''
                    experience = conditions[1].text.strip() if len(conditions) > 1 else ''
                    salary = conditions[2].text.strip() if len(conditions) > 2 else ''

                    tech_stack = ['Python', 'SQLAlchemy']  # 예시: 실제 크롤링 시 수정 필요
                    description = job.select_one('.job_sector')
                    description = description.text.strip() if description else ''

                    jobs.append({
                        'title': title,
                        'company': company,
                        'location': location,
                        'experienceLevel': experience,
                        'salary': salary,
                        'techStack': tech_stack,
                        'description': description,
                    })
                except AttributeError:
                    continue

            print(f"{page}페이지 크롤링 완료")
            time.sleep(1)

        except requests.RequestException as e:
            print(f"페이지 요청 중 오류 발생: {e}")
            continue

    return jobs
