/* eslint-disable */
// ローカルストレージAPIの使用
// todoリストの情報をjsonで保存
var STORAGE_KEY = 'todos-vuejs-demo'
var todoStorage = {
	fetch: function(){
			var todos = JSON.parse(
					localStorage.getItem(STORAGE_KEY) || '[]'
			)
			todos.forEach(function(todo, index) {
					todo.id = index            
			})
			todoStorage.uid = todos.length
			return todos
	}, 
	save: function(todos){
			localStorage.setItem(STORAGE_KEY, JSON.straingify(todos))
	}
}

const app = new Vue({
	el: '#app', 
	data: {
			// 使用するデータ
			todos: [],
			options: [
					{ value: -1, label: '全て'},
					{ value: 0,  label: '作業中'},
					{ value: 1,  label: '完了'}
			],
			// 選択しているoptionsのvalueを記憶するためのデータ
			// 初期状態は-1, つまり「すべて」にする
			current: -1
	}, 
	methods: {
			// 使用するメソッド
			// Todo 追加の処理
			doAdd: function(event, value) {
					// refで名前をつけておいた要素を参照
					var comment = this.$refs.comment
					// 入力がなければ何もしないでreturn
					if (!comment.value.length){
							return
					}
					// {新しいID, コメント, 作業状態}
					// というオブジェクトを現在のtodosりすとへpush
					// 作業状態"state"はデフォルト「作業中=0」で作成
					this.todos.push({
							id: todoStorage.uid++,
							comment: comment.value,
							state: 0
					})
					//フォーム要素を空にする
					comment.value = ''
			},
			doChangeState: function(item){
					item.state = item.state ? 0 : 1
			},
			doRemove: function(item){
					var index = this.todos.indexOf(item)
					this.todos.splice(index, 1)
			}
	},
	// todosデータに変化があったときは自動的にストレージに保存される
	watch: {
			// オプションを使う場合はオブジェクト形式にする
			todos: {
					// 引数はウォッチステイルプロバディの変更後の値
					handler: function(todos) {
							todoStorage.save(todos)
					}, 
					// deepオプションでネスとしているデータも監視できる
					deep: true
			}
	}, 
	created(){
			// インスタンス生成時に自動的にfetch()する
			this.todos = todoStorage.fetch()
	}, 
	computed: {
			// キーから見つけやすいように次のように加工したデータを作成
			// {0: 作業中, 1: 完了, -1: 全て}
			labels(){
					return this.options.reduce(function(a, b){
							return Object.assign(a, { [b.value]: b.label })
					}, {})
			},
			computedTodos: function(){
					// データcurrentが-1なら全て
					// それ意外ならcurrentとstateが一致するものだけに絞り込む
					return this.todos.filter(function(el){
							return this.current < 0 ? true : this.current === el.state
					}, this)
			}
	}

})