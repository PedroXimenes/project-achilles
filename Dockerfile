FROM python:3

COPY ./requirements.txt .

ADD ./controller.py .
ADD ./app.py .

RUN pip3 install -r requirements.txt

EXPOSE 80

CMD ["python3", "app.py"]

