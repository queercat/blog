import os

for path, dirs, files in os.walk('out/'):
    for file in files:
        rp = os.path.join(path, file)

        if '.html' in rp and 'index.html' not in rp:
            new = rp.replace('.html', '')
            os.rename(rp, new)
