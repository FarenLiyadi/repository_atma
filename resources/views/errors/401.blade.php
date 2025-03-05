<!DOCTYPE html>
<html>
<head>
    <title>401</title>
    <link rel="stylesheet" href="{{ asset('css/app.css') }}"> <!-- Link your CSS here -->
</head>
<body>
    <div class="container">
        <h1>Salah password</h1>
        <p>silahkan coba lagi</p>
        <a href="{{ url('/guest/' . $id) }}"  style="cursor: pointer; color: blue; text-decoration: underline;">Back</a>
    </div>
</body>
</html>