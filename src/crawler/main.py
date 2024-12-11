from DB import init_db, save_jobs_to_db
from crawler import crawl_saramin

if __name__ == "__main__":
    # 데이터베이스 초기화
    init_db()

    # 크롤링 실행
    keyword = "python"
    pages = 3
    job_list = crawl_saramin(keyword, pages)

    # 데이터 저장
    save_jobs_to_db(job_list)
