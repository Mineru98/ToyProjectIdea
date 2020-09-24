from datetime import datetime

"""
처리 데이터 정의 및 기능 구현부
"""


class Data:

    """
    생성자
    name : 기입자
    content : 내용
    value : 가격
    value_type : 수익(True) & 지출(False) 구분
    created_at : 기입 날짜
    """

    def __init__(self):
        self.list = []

    """
    데이터 삽입
    """

    def insert(self, name, content, value, value_type):
        obj = {}
        try:
            if str(type(name)) == str(type("")):
                obj["name"] = name
            else:
                raise TypeError("Name Type Error")
            if str(type(content)) == str(type("")):
                obj["content"] = content
            else:
                raise TypeError("Content Type Error")
            if str(type(value)) == str(type(0)):
                obj["value"] = value
            else:
                raise TypeError("Value Type Error")
            if str(type(value_type)) == str(type(False)):
                obj["value_type"] = value_type
            else:
                raise TypeError("ValueType Type Error")
            obj["created_at"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            self.list.append(obj)
        except NameError as e:
            print(e)

    """
    데이터 조회
    """

    def show(self, index=None):
        if str(type(index)) == str(type(None)):
            print("데이터 전체 조회")
            for row in self.list:
                print(row)
        else:
            if str(type(index) == str(type(0))):
                if index < len(self.list):
                    print("%d번째 데이터 전체 조회" % (index + 1))
                    print(self.list[index])
                else:
                    print("존재하지 않는 데이터")
            else:
                pass


if __name__ == "__main__":
    list = Data()
    check = True
    while check:
        print("데이터 추가")
        list.insert("kim", "내용1", 10000, False)
        print("전체 데이터 조회")
        list.show()
        print("데이터 추가")
        list.insert("lee", "내용2", 20000, False)
        print("전체 데이터 조회")
        list.show()
        print("2번째 데이터 조회")
        list.show(2)
        check = False
