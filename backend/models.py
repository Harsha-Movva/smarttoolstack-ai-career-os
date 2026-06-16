from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey
)

from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(String)

    email = Column(
        String,
        unique=True
    )

    password = Column(String)


class Report(Base):
    __tablename__ = "reports"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    ats_score = Column(String)

    career = Column(String)

    skills = Column(String)

    missing_skills = Column(String)

    roadmap = Column(String)

    created_at = Column(String)