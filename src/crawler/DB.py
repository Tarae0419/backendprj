from sqlalchemy import Column, Integer, String, DateTime, Text, JSON, create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from datetime import datetime

# SQLAlchemy 모델 정의
Base = declarative_base()

class Job(Base):
    __tablename__ = 'job'  # 테이블 이름

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(255), nullable=False)  # 포지션 제목
    company = Column(String(255), nullable=False)  # 회사명
    location = Column(String(255), nullable=True)  # 지역
    experienceLevel = Column(String(255), nullable=True)  # 경력 요구사항
    salary = Column(String(255), nullable=True)  # 급여 정보
    techStack = Column(JSON, nullable=True)  # 기술 스택
    description = Column(Text, nullable=True)  # 공고 설명
    views = Column(Integer, default=0)  # 조회수
    createdAt = Column(DateTime, default=datetime.utcnow)  # 공고 생성 날짜
    updatedAt = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)  # 공고 수정 날짜

# 데이터베이스 설정
DATABASE_URL = "mysql+pymysql://WSD3:1234@113.198.66.75:10103/company"
engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 데이터베이스 초기화
def init_db():
    Base.metadata.create_all(bind=engine)

# 데이터 저장 함수
def save_jobs_to_db(jobs):
    """
    크롤링한 데이터를 데이터베이스에 저장합니다.
    """
    session = SessionLocal()
    try:
        for job_data in jobs:
            job = Job(
                title=job_data['title'],
                company=job_data['company'],
                location=job_data['location'],
                experienceLevel=job_data.get('experienceLevel', ''),
                salary=job_data.get('salary', ''),
                techStack=job_data.get('techStack', []),
                description=job_data.get('description', ''),
            )
            session.add(job)
        session.commit()
        print(f"{len(jobs)}개의 공고가 저장되었습니다.")
    except Exception as e:
        print(f"데이터 저장 중 오류 발생: {e}")
        session.rollback()
    finally:
        session.close()
