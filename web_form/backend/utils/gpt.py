import pandas as pd
import selenium
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from time import sleep
import undetected_chromedriver as uc
from selenium.webdriver.support.ui import WebDriverWait
from fake_useragent import UserAgent
from selenium.webdriver.support import expected_conditions as EC

# ext = Extract_Examples()
# lst = [a for a in range(310,400)]
# x,sentences = ext.prompt_examples(2,lst)
x = "Pythagorean Theorem"
prompt =  "Consider you are an excellent teacher of math, now explain the concept of "+ x + "such that a 5th grader can understand it. "
# prompt = prompt+str(sentences)+" [OUTPUT: "
# print(prompt)

op = webdriver.ChromeOptions()
op.add_argument(f"user-agent={UserAgent.random}")
op.add_argument("user-data-dir=./")
op.add_experimental_option("detach", True)
op.add_experimental_option("excludeSwitches", ["enable-logging"])

driver = uc.Chrome(chrome_options=op)

MAIL = "*********************"
PASSWORD = "***********"
# PATH = "/home/imnitin/code_snippets/tweets_scrapping/chromedriver"
PATH = "/home/shimroo/Softwares/chromedriver-linux64/chromedriver-linux64/chromedriver"

driver.get('https://chat.openai.com/auth/login')

sleep(1)

# inputElements = driver.find_elements(By.CLASS_NAME, "btn relative btn-neutral")
# print(inputElements.__len__())
# inputElements[0].click()

# sleep(3)

# mail = driver.find_elements(By.TAG_NAME,"input")[1]
# mail.send_keys(MAIL)

# btn=driver.find_elements(By.TAG_NAME,"button")[0]
# btn.click()

# password= driver.find_elements(By.TAG_NAME,"input")[2]
# password.send_keys(PASSWORD)

# sleep(3)

# wait = WebDriverWait(driver, 10)
# btn = wait.until(EC.element_to_be_clickable((By.CLASS_NAME, "_button-login-password")))
# btn.click()
# sleep(10)

inputElements = driver.find_elements(By.TAG_NAME, "textarea")

i = 0
# while i<10:
inputElements[0].send_keys(prompt)
sleep(2)
inputElements[0].send_keys(Keys.ENTER)
sleep(10)
inputElements = driver.find_elements(By.TAG_NAME, "p")
sleep(5)
results = []
for element in inputElements:
   results.append(element.text)
print(results)
i+=1
sleep(5)